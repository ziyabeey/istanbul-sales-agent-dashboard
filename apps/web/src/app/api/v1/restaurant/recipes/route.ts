/**
 * Restaurant Recipe API — CRUD + Cost Calculation
 * GET  /api/v1/restaurant/recipes — List recipes
 * POST /api/v1/restaurant/recipes — Create/update/cost calc
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const recipeId = searchParams.get('id')

    if (recipeId) {
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(recipeId).get()
      if (!doc.exists) return NextResponse.json({ error: 'Reçete bulunamadı' }, { status: 404 })
      return NextResponse.json({ ok: true, recipe: { id: doc.id, ...doc.data() } })
    }

    const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').orderBy('name').limit(500).get()
    return NextResponse.json({ ok: true, recipes: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })), count: snap.size })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'create': {
        const { name, ingredients, instructions, preparationTime, cookingTime, servings, menuItemId } = body
        if (!name || !ingredients?.length) return NextResponse.json({ error: 'name ve ingredients gerekli' }, { status: 400 })

        // Calculate cost from inventory
        let totalCost = 0
        for (const ing of ingredients) {
          if (ing.inventoryItemId) {
            const invDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(ing.inventoryItemId).get()
            if (invDoc.exists) {
              const unitCost = invDoc.data()!.unitCost || 0
              totalCost += unitCost * ing.quantity * (ing.wasteFactor || 1)
            }
          }
        }

        const costPerServing = servings > 0 ? totalCost / servings : totalCost

        // Get menu item price for food cost %
        let foodCostPercentage = 0
        if (menuItemId) {
          const menuDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(menuItemId).get()
          if (menuDoc.exists) {
            const salePrice = menuDoc.data()!.pricing?.basePrice || 0
            foodCostPercentage = salePrice > 0 ? (costPerServing / salePrice) * 100 : 0
          }
        }

        const recipe = {
          id: uuidv4(), esnafId, name, menuItemId: menuItemId || null,
          ingredients, instructions: instructions || '', preparationTime: preparationTime || 10, cookingTime: cookingTime || 15,
          totalTime: (preparationTime || 10) + (cookingTime || 15), servings: servings || 1,
          costPerServing: Math.round(costPerServing * 100) / 100, totalCost: Math.round(totalCost * 100) / 100,
          foodCostPercentage: Math.round(foodCostPercentage * 10) / 10, targetFoodCost: 30,
          aiSuggestions: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(recipe.id).set(recipe)
        return NextResponse.json({ ok: true, recipe }, { status: 201 })
      }

      case 'update': {
        const { recipeId, ...updates } = body
        if (!recipeId) return NextResponse.json({ error: 'recipeId gerekli' }, { status: 400 })
        const { action: _, ...safe } = updates
        await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(recipeId).update({ ...safe, updatedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: 'Reçete güncellendi' })
      }

      case 'recalculate_cost': {
        const { recipeId } = body
        const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(recipeId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Reçete bulunamadı' }, { status: 404 })
        const recipe = doc.data()!

        let totalCost = 0
        for (const ing of (recipe.ingredients || [])) {
          if (ing.inventoryItemId) {
            const invDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(ing.inventoryItemId).get()
            if (invDoc.exists) totalCost += (invDoc.data()!.unitCost || 0) * ing.quantity * (ing.wasteFactor || 1)
          }
        }

        const costPerServing = recipe.servings > 0 ? totalCost / recipe.servings : totalCost
        let foodCostPercentage = 0
        if (recipe.menuItemId) {
          const menuDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(recipe.menuItemId).get()
          if (menuDoc.exists) {
            const price = menuDoc.data()!.pricing?.basePrice || 0
            foodCostPercentage = price > 0 ? (costPerServing / price) * 100 : 0
          }
        }

        await doc.ref.update({ totalCost: Math.round(totalCost * 100) / 100, costPerServing: Math.round(costPerServing * 100) / 100, foodCostPercentage: Math.round(foodCostPercentage * 10) / 10, updatedAt: new Date().toISOString() })

        return NextResponse.json({
          ok: true, totalCost, costPerServing, foodCostPercentage: Math.round(foodCostPercentage * 10) / 10,
          status: foodCostPercentage > 35 ? '⚠️ Food cost yüksek!' : '✅ Food cost hedefte',
        })
      }

      case 'delete': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(body.recipeId).delete()
        return NextResponse.json({ ok: true, mesaj: 'Reçete silindi' })
      }

      default:
        return NextResponse.json({ error: 'action: create, update, recalculate_cost, delete' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
