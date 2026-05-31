/**
 * @kepenk/templates — Plan-Based Section Variants Barrel
 *
 * Imports all plan-variant files to trigger registerSection() side-effects.
 * Each file registers 5 variants: plan_free, plan_starter, plan_growth, plan_pro, plan_enterprise
 */

import './HeroPlanVariants'
import './ServicesPlanVariants'
import './HeaderPlanVariants'
import './FooterPlanVariants'
import './AboutPlanVariants'
import './ContactPlanVariants'
import './StatsPlanVariants'
import './GalleryPlanVariants'
import './FAQPlanVariants'
import './TestimonialsPlanVariants'
import './CTAPlanVariants'
import './TeamPlanVariants'

export {
  HeroFree, HeroStarter, HeroGrowth, HeroPro, HeroEnterprise,
} from './HeroPlanVariants'

export {
  ServicesFree, ServicesStarter, ServicesGrowth, ServicesPro, ServicesEnterprise,
} from './ServicesPlanVariants'

export {
  HeaderFree, HeaderStarter, HeaderGrowth, HeaderPro, HeaderEnterprise,
} from './HeaderPlanVariants'

export {
  FooterFree, FooterStarter, FooterGrowth, FooterPro, FooterEnterprise,
} from './FooterPlanVariants'

export {
  AboutFree, AboutStarter, AboutGrowth, AboutPro, AboutEnterprise,
} from './AboutPlanVariants'

export {
  ContactFree, ContactStarter, ContactGrowth, ContactPro, ContactEnterprise,
} from './ContactPlanVariants'

export {
  StatsFree, StatsStarter, StatsGrowth, StatsPro, StatsEnterprise,
} from './StatsPlanVariants'

export {
  GalleryFree, GalleryStarter, GalleryGrowth, GalleryPro, GalleryEnterprise,
} from './GalleryPlanVariants'

export {
  FAQFree, FAQStarter, FAQGrowth, FAQPro, FAQEnterprise,
} from './FAQPlanVariants'

export {
  TestimonialsFree, TestimonialsStarter, TestimonialsGrowth, TestimonialsPro, TestimonialsEnterprise,
} from './TestimonialsPlanVariants'

export {
  CTAFree, CTAStarter, CTAGrowth, CTAPro, CTAEnterprise,
} from './CTAPlanVariants'

export {
  TeamFree, TeamStarter, TeamGrowth, TeamPro, TeamEnterprise,
} from './TeamPlanVariants'
