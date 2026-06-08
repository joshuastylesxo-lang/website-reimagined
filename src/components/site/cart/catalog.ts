export type CatalogItem = {
  id: string;
  name: string;
  description?: string;
  original: number;
  price: number;
  rating: number;
  unit?: string;
  includes?: string[];
  excludes?: string[];
  image?: string;
  subcategory?: string;
};

export type Category = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  items: CatalogItem[];
  parent?: string;
};

import sofaImg from "@/assets/catalog/sofa.jpg";
import chairImg from "@/assets/catalog/chair.jpg";
import carpetImg from "@/assets/catalog/carpet.jpg";
import curtainImg from "@/assets/catalog/curtain.jpg";
import mattressImg from "@/assets/catalog/mattress.jpg";
import plasticTankImg from "@/assets/catalog/plastic-tank.jpg";
import cementTankImg from "@/assets/catalog/cement-tank.jpg";
import roofTopTankImg from "@/assets/catalog/rooftop-tank.jpg";
import undergroundTankImg from "@/assets/catalog/underground-tank.jpg";
import deepImg from "@/assets/catalog/deep.jpg";
import solarImg from "@/assets/catalog/solar.jpg";
import acImg from "@/assets/services/ac.jpg";
import acGeneralImg from "@/assets/services/ac/general.jpg";
import acInstallImg from "@/assets/services/ac/install.jpg";
import acRepairImg from "@/assets/services/ac/repair.jpg";
import acMountDismountImg from "@/assets/services/ac/mount-dismount.jpg";
import acDismountImg from "@/assets/services/ac/dismount.jpg";
import acMdGeneralImg from "@/assets/services/ac/md-general.jpg";

import plumberImg from "@/assets/services/home/plumber.jpg";
import plMixerTap from "@/assets/services/plumber/mixer-tap.jpg";
import plSingleTap from "@/assets/services/plumber/single-tap.jpg";
import plSinkSpindle from "@/assets/services/plumber/sink-spindle.jpg";
import plMuslimShower from "@/assets/services/plumber/muslim-shower.jpg";
import plMotor from "@/assets/services/plumber/motor.jpg";
import plKitchenLeak from "@/assets/services/plumber/kitchen-leak.jpg";
import plCommodeTank from "@/assets/services/plumber/commode-tank.jpg";
import plHotColdPipe from "@/assets/services/plumber/hot-cold-pipe.jpg";
import plWashAccessory from "@/assets/services/plumber/wash-accessory.jpg";
import plKitchenDrain from "@/assets/services/plumber/kitchen-drain.jpg";
import plWashingMachine from "@/assets/services/plumber/washing-machine.jpg";
import plOvenRange from "@/assets/services/plumber/oven-range.jpg";
import plTankSupply from "@/assets/services/plumber/tank-supply.jpg";
import plGasPipe from "@/assets/services/plumber/gas-pipe.jpg";
import plHousePlumbing from "@/assets/services/plumber/house-plumbing.jpg";
import plCommodeInstall from "@/assets/services/plumber/commode-install.jpg";
import plPipeLeak from "@/assets/services/plumber/pipe-leak.jpg";
import plDrainInstall from "@/assets/services/plumber/drain-install.jpg";
import plSinkInstall from "@/assets/services/plumber/sink-install.jpg";
import plSinkPipeRep from "@/assets/services/plumber/sink-pipe-rep.jpg";
import plTankInstall from "@/assets/services/plumber/tank-install.jpg";
import plHandleValve from "@/assets/services/plumber/handle-valve.jpg";
import plBathShower from "@/assets/services/plumber/bath-shower.jpg";
import plWashbasin from "@/assets/services/plumber/washbasin.jpg";
import electricianImg from "@/assets/services/home/electrician.jpg";
import handymanImg from "@/assets/services/home/handyman.jpg";
import elCeilingFanInstall from "@/assets/services/home/electrician/ceiling-fan-install.jpg";
import elSmdLights from "@/assets/services/home/electrician/smd-lights.jpg";
import elLedTvMount from "@/assets/services/home/electrician/led-tv-mount.jpg";
import elSwitchButton from "@/assets/services/home/electrician/switch-button.jpg";
import elChangeOver from "@/assets/services/home/electrician/change-over.jpg";
import elPressureMotor from "@/assets/services/home/electrician/pressure-motor.jpg";
import elSingleBreaker from "@/assets/services/home/electrician/single-breaker.jpg";
import elDistributionBox from "@/assets/services/home/electrician/distribution-box.jpg";
import elAutoTankSwitch from "@/assets/services/home/electrician/auto-tank-switch.jpg";
import elWmRepair from "@/assets/services/home/electrician/wm-repair.jpg";
import elFanDimmer from "@/assets/services/home/electrician/fan-dimmer.jpg";
import elUpsRepair from "@/assets/services/home/electrician/ups-repair.jpg";
import elUpsInstall from "@/assets/services/home/electrician/ups-install.jpg";
import elExhaustFan from "@/assets/services/home/electrician/exhaust-fan.jpg";
import elNewHouseWiring from "@/assets/services/home/electrician/new-house-wiring.jpg";
import elPumpRepair from "@/assets/services/home/electrician/pump-repair.jpg";
import elWiring from "@/assets/services/home/electrician/wiring.jpg";
import elHouseElec from "@/assets/services/home/electrician/house-elec.jpg";
import elPillarLights from "@/assets/services/home/electrician/pillar-lights.jpg";
import elFancyLights from "@/assets/services/home/electrician/fancy-lights.jpg";
import elHoodRepair from "@/assets/services/home/electrician/hood-repair.jpg";
import elHoodInstall from "@/assets/services/home/electrician/hood-install.jpg";
import elPowerPlug from "@/assets/services/home/electrician/power-plug.jpg";
import elLightPlug from "@/assets/services/home/electrician/light-plug.jpg";
import elCeilingFanRep from "@/assets/services/home/electrician/ceiling-fan-rep.jpg";
import elTubeLight from "@/assets/services/home/electrician/tube-light.jpg";
import elSubMeter from "@/assets/services/home/electrician/sub-meter.jpg";
import hmCurtainRod from "@/assets/services/home/handyman/curtain-rod.jpg";
import hmArt from "@/assets/services/home/handyman/art.jpg";
import hmMirror from "@/assets/services/home/handyman/mirror.jpg";
import hmPicture from "@/assets/services/home/handyman/picture.jpg";
import hmShelf from "@/assets/services/home/handyman/shelf.jpg";
import hmClock from "@/assets/services/home/handyman/clock.jpg";
import carpenterImg from "@/assets/services/home/carpenter.jpg";
import painterImg from "@/assets/services/home/painter.jpg";
import appliancesImg from "@/assets/services/home/appliances.jpg";
import geyserImg from "@/assets/services/home/geyser.jpg";
import pestImg from "@/assets/services/home/pest.jpg";
import cpWardrobe from "@/assets/services/home/carpenter/wardrobe.jpg";
import cpDoorInstall from "@/assets/services/home/carpenter/door-install.jpg";
import cpDoorRepair from "@/assets/services/home/carpenter/door-repair.jpg";
import cpWork from "@/assets/services/home/carpenter/work.jpg";
import cpDrawerRep from "@/assets/services/home/carpenter/drawer-repair.jpg";
import cpFurniture from "@/assets/services/home/carpenter/furniture.jpg";
import cpRoomLock from "@/assets/services/home/carpenter/room-lock.jpg";
import cpDrawerLock from "@/assets/services/home/carpenter/drawer-lock.jpg";
import cpCatcher from "@/assets/services/home/carpenter/catcher.jpg";
import ptOutdoor from "@/assets/services/home/painter/outdoor.jpg";
import ptIndoor from "@/assets/services/home/painter/indoor.jpg";
import ptFurnPolish from "@/assets/services/home/painter/furn-polish.jpg";
import ptGray from "@/assets/services/home/painter/gray.jpg";
import ptDoorPolish from "@/assets/services/home/painter/door-polish.jpg";
import ptTables from "@/assets/services/home/painter/tables.jpg";
import ptWindow from "@/assets/services/home/painter/window.jpg";
import ptWoodenDoor from "@/assets/services/home/painter/wooden-door.jpg";
import apCookRange from "@/assets/services/home/appliances/cook-range.jpg";
import apWmRepair from "@/assets/services/home/appliances/wm-repair.jpg";
import apOvenService from "@/assets/services/home/appliances/oven-service.jpg";
import apHoodInstall from "@/assets/services/home/appliances/hood-install.jpg";
import apHoodRepair from "@/assets/services/home/appliances/hood-repair.jpg";
import apWmGeneral from "@/assets/services/home/appliances/wm-general.jpg";
import gyInstService from "@/assets/services/home/geyser/inst-service.jpg";
import gyInstInstall from "@/assets/services/home/geyser/inst-install.jpg";
import gyGasService from "@/assets/services/home/geyser/gas-service.jpg";
import gyGasInstall from "@/assets/services/home/geyser/gas-install.jpg";
import gyElecRepair from "@/assets/services/home/geyser/elec-repair.jpg";
import gyElecInstall from "@/assets/services/home/geyser/elec-install.jpg";
import gyElecDismount from "@/assets/services/home/geyser/elec-dismount.jpg";
import gyGasRepair from "@/assets/services/home/geyser/gas-repair.jpg";
import gyGasDismount from "@/assets/services/home/geyser/gas-dismount.jpg";
import gyInstRepair from "@/assets/services/home/geyser/inst-repair.jpg";
import gyElecService from "@/assets/services/home/geyser/elec-service.jpg";
import gyInstDismount from "@/assets/services/home/geyser/inst-dismount.jpg";
import pcGeneral from "@/assets/services/home/pest/general.jpg";
import pcCockroach from "@/assets/services/home/pest/cockroach.jpg";
import pcBedbug from "@/assets/services/home/pest/bedbug.jpg";
import pcDengue from "@/assets/services/home/pest/dengue.jpg";
import pcDisinfect from "@/assets/services/home/pest/disinfect.jpg";

const r = (min = 4.3, max = 4.9) =>
  Math.round((min + Math.random() * (max - min)) * 10) / 10;

export const catalog: Category[] = [
  {
    id: "cleaning",
    name: "Sofa and Carpet Cleaning",
    blurb: "Sofa, carpet, mattress, curtain & deep cleaning — all in one place.",
    image: sofaImg,
    items: [
      { id: "sofa-1", name: "Sofa Cleaning", description: "Per seat deep shampoo cleaning.", original: 500, price: 350, rating: 4.6, image: sofaImg, subcategory: "Sofa Cleaning" },
      { id: "sofa-dewan", name: "Dewan Cleaning", description: "Full dewan shampoo & sanitization.", original: 1500, price: 1200, rating: 4.6, image: sofaImg, subcategory: "Sofa Cleaning" },
      { id: "sofa-cumbed", name: "Sofa Cum Bed Cleaning", description: "Sofa-cum-bed full deep clean.", original: 2000, price: 1450, rating: 4.4, image: sofaImg, subcategory: "Sofa Cleaning" },

      { id: "chair-4", name: "Chair Cleaning 4 Seats", description: "Set of 4 chairs deep cleaned.", original: 1400, price: 1200, rating: r(), image: chairImg, subcategory: "Chair Cleaning" },
      { id: "chair-6", name: "Chair Cleaning 6 Seats", description: "Set of 6 chairs deep cleaned.", original: 2000, price: 1650, rating: r(), image: chairImg, subcategory: "Chair Cleaning" },
      { id: "chair-8", name: "Chair Cleaning 8 Seats", description: "Set of 8 chairs deep cleaned.", original: 4000, price: 2150, rating: r(), image: chairImg, subcategory: "Chair Cleaning" },
      { id: "chair-10", name: "Chair Cleaning 10 Seats", description: "Set of 10 chairs deep cleaned.", original: 4800, price: 2650, rating: r(), image: chairImg, subcategory: "Chair Cleaning" },
      { id: "chair-12", name: "Chair Cleaning 12 Seats", description: "Set of 12 chairs deep cleaned.", original: 5400, price: 3150, rating: r(), image: chairImg, subcategory: "Chair Cleaning" },

      { id: "carpet-1", name: "Carpet Cleaning", description: "Deep shampoo, stain removal.", original: 36, price: 20, rating: r(), unit: "/ SQFT", image: carpetImg, subcategory: "Carpet Cleaning" },
      { id: "rug-1", name: "Rug Cleaning", description: "Premium rug shampoo & care.", original: 44, price: 23, rating: r(), unit: "/ SQFT", image: carpetImg, subcategory: "Carpet Cleaning" },

      { id: "curtain-1", name: "Curtain Cleaning", description: "On-site dry/wet curtain wash.", original: 1700, price: 1000, rating: r(), image: curtainImg, subcategory: "Curtain Cleaning" },
      { id: "blind-1", name: "Blind Cleaning", description: "Detailed blind cleaning service.", original: 1500, price: 900, rating: r(), image: curtainImg, subcategory: "Curtain Cleaning" },

      { id: "mat-single", name: "Single Mattress Cleaning", description: "Single mattress deep clean.", original: 3100, price: 1650, rating: r(), image: mattressImg, subcategory: "Bed / Mattress Cleaning" },
      { id: "mat-double", name: "Double Mattress Cleaning", description: "Double mattress deep clean.", original: 3700, price: 2000, rating: r(), image: mattressImg, subcategory: "Bed / Mattress Cleaning" },
      { id: "bed-1", name: "Bed Cleaning", description: "Bed frame & headboard cleaning.", original: 800, price: 500, rating: r(), image: mattressImg, subcategory: "Bed / Mattress Cleaning" },

      { id: "deep-h1", name: "Full House Deep Cleaning (3–10 Marla)", description: "Per marla full house deep clean.", original: 700, price: 500, rating: r(), unit: "/ Marla", image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-r1", name: "Room Deep Cleaning (3–10 Marla)", description: "Single room deep clean.", original: 4500, price: 2100, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-k1", name: "Kitchen Deep Cleaning (3–10 Marla)", description: "Kitchen deep clean & degrease.", original: 4500, price: 2800, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-w1", name: "Washroom Deep Cleaning (3–10 Marla)", description: "Washroom deep clean & sanitize.", original: 4000, price: 2400, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-h2", name: "Full House Deep Cleaning (11 Marla – 3 Kanal)", description: "Per marla full house deep clean.", original: 700, price: 500, rating: r(), unit: "/ Marla", image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-r2", name: "Room Deep Cleaning (11 Marla – 3 Kanal)", description: "Larger room deep clean.", original: 5500, price: 2900, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-k2", name: "Kitchen Deep Cleaning (11 Marla – 3 Kanal)", description: "Larger kitchen deep clean.", original: 5000, price: 3500, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
      { id: "deep-w2", name: "Washroom Deep Cleaning (10 Marla – 2 Kanal)", description: "Larger washroom deep clean.", original: 5000, price: 2900, rating: r(), image: deepImg, subcategory: "Deep Cleaning" },
    ],
  },
  {
    id: "water-tank",
    name: "Water Tank Cleaning",
    blurb: "Plastic & cement water tank deep cleaning and sanitization.",
    image: cementTankImg,
    items: [
      { id: "ptank-1", name: "150 – 300 Gallons", description: "Plastic tank, 150–300 gallons.", original: 2150, price: 1800, rating: r(), image: plasticTankImg, subcategory: "Plastic Water Tank Cleaning" },
      { id: "ptank-2", name: "350 – 500 Gallons", description: "Plastic tank, 350–500 gallons.", original: 2500, price: 2000, rating: r(), image: plasticTankImg, subcategory: "Plastic Water Tank Cleaning" },
      { id: "ptank-3", name: "550 – 1000 Gallons", description: "Plastic tank, 550–1000 gallons.", original: 3000, price: 2500, rating: r(), image: plasticTankImg, subcategory: "Plastic Water Tank Cleaning" },

      { id: "ctank-r1", name: "Roof Top Tank 3/5ft – 5/5ft", description: "Roof-top cement tank, small.", original: 3000, price: 2500, rating: r(), image: roofTopTankImg, subcategory: "Cement Water Tank Cleaning" },
      { id: "ctank-r2", name: "Roof Top Tank 6/6ft – 8/8ft", description: "Roof-top cement tank, medium.", original: 3500, price: 3000, rating: r(), image: roofTopTankImg, subcategory: "Cement Water Tank Cleaning" },
      { id: "ctank-r3", name: "Roof Top Tank 9/9ft – 12/12ft", description: "Roof-top cement tank, large.", original: 5000, price: 4500, rating: r(), image: roofTopTankImg, subcategory: "Cement Water Tank Cleaning" },
      { id: "ctank-u1", name: "Underground Tank 3/5ft – 5/5ft", description: "Underground cement tank, small.", original: 3500, price: 3000, rating: r(), image: undergroundTankImg, subcategory: "Cement Water Tank Cleaning" },
      { id: "ctank-u2", name: "Underground Tank 6/6ft – 8/8ft", description: "Underground cement tank, medium.", original: 4000, price: 3500, rating: r(), image: undergroundTankImg, subcategory: "Cement Water Tank Cleaning" },
      { id: "ctank-u3", name: "Underground Tank 9/9ft – 12/12ft", description: "Underground cement tank, large.", original: 6000, price: 5000, rating: r(), image: undergroundTankImg, subcategory: "Cement Water Tank Cleaning" },
    ],
  },
  {
    id: "solar",
    name: "Solar Panel Cleaning",
    blurb: "Professional cleaning for residential and commercial solar systems.",
    image: solarImg,
    items: [
      { id: "solar-1", name: "3KW – 6KW", description: "Small residential solar systems.", original: 310, price: 290, rating: 4.8, unit: "/ KW", image: solarImg, subcategory: "Solar Panel Cleaning" },
      { id: "solar-2", name: "7KW – 18KW", description: "Mid-size residential / commercial.", original: 220, price: 205, rating: 4.4, unit: "/ KW", image: solarImg, subcategory: "Solar Panel Cleaning" },
      { id: "solar-3", name: "20KW – 40KW", description: "Large commercial solar systems.", original: 195, price: 160, rating: 4.7, unit: "/ KW", image: solarImg, subcategory: "Solar Panel Cleaning" },
    ],
  },
  {
    id: "ac",
    name: "AC Services",
    blurb: "Service, install, repair & mount AC units by verified pros.",
    image: acImg,
    items: [
      {
        id: "ac-general",
        name: "AC Service",
        description: "Per AC (1 to 2.5 tons)",
        original: 3300, price: 2500, rating: 4.3,
        image: acGeneralImg,
        includes: [
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "AC pipe installation more than 10 feet",
          "Any type of repair",
          "Any type of material",
          "Any type of gas",
          "Ladder",
          "Underground and ceiling piping",
        ],
      },
      {
        id: "ac-install",
        name: "AC Installation",
        description: "Installation with 10 Feet pipe (1 to 2.5 tons)",
        original: 5100, price: 3200, rating: 4.4,
        image: acInstallImg,
        includes: [
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "AC pipe installation more than 10 feet",
          "Any type of repair",
          "Any type of material",
          "Any type of gas",
          "Ladder",
          "Underground and ceiling piping",
        ],
      },
      {
        id: "ac-repair",
        name: "AC Repairing and Gas Filling",
        description: "Visit and Inspection Charges",
        original: 1000, price: 800, rating: 4.3,
        image: acRepairImg,
        includes: [
          "AC inspection",
          "AC gas check",
          "AC gas leakage check",
          "Repair charges decided after inspection",
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "Any type of material",
          "Any type of gas",
          "Ladder",
          "AC pipe installation more than 10 feet",
          "Any type of repair",
          "Underground and ceiling piping",
        ],
      },
      {
        id: "ac-mount-dismount",
        name: "AC Mounting and Dismounting",
        description: "Per AC (1 to 2.5 tons)",
        original: 6400, price: 4000, rating: 4.6,
        image: acMountDismountImg,
        includes: [
          "Dismount indoor & outdoor unit from one place",
          "Mount indoor & outdoor unit to second place",
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "Logistics of AC",
          "Any type of repair",
          "Any type of material",
          "Any type of gas",
          "Ladder",
          "Underground and ceiling piping",
          "Installation of AC pipe more than 10 feet",
        ],
      },
      {
        id: "ac-dismount",
        name: "AC Dismounting",
        description: "Per AC (1 to 2.5 tons)",
        original: 1500, price: 1200, rating: 4.8,
        image: acDismountImg,
        includes: [
          "Dismounting of indoor unit",
          "Dismounting of outdoor unit",
          "AC pipe dismounting",
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "Any type of repair",
          "Any type of material",
          "Any type of gas",
          "Ladder",
          "AC pipe installation more than 10 feet",
          "Underground and ceiling piping dismounting",
          "Underground and ceiling piping",
        ],
      },
      {
        id: "ac-md-general",
        name: "AC Mounting and Dismounting + AC General Service",
        description: "Per AC (1 to 2.5 tons)",
        original: 8500, price: 5500, rating: 4.9,
        image: acMdGeneralImg,
        includes: [
          "Dismount indoor & outdoor unit from one location",
          "Mount indoor & outdoor unit to second location",
          "Clean indoor & outdoor unit on customer location",
          "Mounting of indoor unit",
          "Mounting of outdoor unit",
          "AC pipe installation within 10 feet",
        ],
        excludes: [
          "Installation of AC pipe more than 10 feet",
          "Any type of material",
          "Any type of gas",
          "Any type of logistics",
          "Any type of repair",
          "Ladder",
          "Underground and ceiling piping",
        ],
      },
    ],
  },
  // ===== Home Services subcategories =====

  {
    id: "plumber",
    name: "Plumber Services",
    blurb: "Verified plumbers for taps, leakage, sinks, commodes, motors and more.",
    image: plumberImg,
    items: [
      { id: "pl-mixer-tap", name: "Mixer Tap Installation", description: "Install new mixer tap with fittings.", original: 950, price: 850, rating: 4.6, image: plMixerTap },
      { id: "pl-single-tap", name: "Single Tap Installation", description: "Install a single faucet.", original: 900, price: 700, rating: 4.5, image: plSingleTap },
      { id: "pl-sink-spindle", name: "Sink Spindle Change", description: "Replace sink spindle / valve.", original: 900, price: 700, rating: 4.4, image: plSinkSpindle },
      { id: "pl-muslim-shower", name: "Muslim Shower Replacement", description: "Replace Muslim shower set.", original: 950, price: 850, rating: 4.5, image: plMuslimShower },
      { id: "pl-motor-install", name: "Water Motor Installation", description: "Install water motor with fittings.", original: 1350, price: 1200, rating: 4.6, image: plMotor },
      { id: "pl-kitchen-leak", name: "Kitchen Leakage Repairing", description: "Fix kitchen pipe leakage.", original: 600, price: 500, rating: 4.4, image: plKitchenLeak },
      { id: "pl-commode-tank-rep", name: "Commode Tank Machine Repairing", description: "Repair flush tank mechanism.", original: 1350, price: 1200, rating: 4.5, image: plCommodeTank },
      { id: "pl-hot-cold-pipe", name: "Hot or Cold Water Piping", description: "Hot/cold water piping work.", original: 1000, price: 800, rating: 4.4, image: plHotColdPipe },
      { id: "pl-wash-accessory", name: "Washroom Accessory Installation", description: "Install washroom accessories.", original: 2000, price: 1800, rating: 4.6, image: plWashAccessory },
      { id: "pl-kitchen-drain", name: "Kitchen Drain Blockage", description: "Clear kitchen drain blockage.", original: 1200, price: 1000, rating: 4.5, image: plKitchenDrain },
      { id: "pl-wm-with-wire", name: "Automatic Washing Machine Installation (With Wiring)", description: "Install with full wiring.", original: 2800, price: 2500, rating: 4.7, image: plWashingMachine },
      { id: "pl-commode-tank-rep2", name: "Commode Tank Machine Replacement", description: "Replace flush tank mechanism.", original: 1200, price: 1000, rating: 4.5, image: plCommodeTank },
      { id: "pl-motor-repair", name: "Water Motor Repairing", description: "Repair water motor.", original: 1000, price: 800, rating: 4.4, image: plMotor },
      { id: "pl-oven-range-serv", name: "Oven Range Service", description: "Cooking range / oven service.", original: 1800, price: 1500, rating: 4.5, image: plOvenRange },
      { id: "pl-tank-supply", name: "Water Tank Supply Issue", description: "Fix water tank supply issues.", original: 900, price: 800, rating: 4.4, image: plTankSupply },
      { id: "pl-gas-pipe", name: "Gas Pipe Wiring", description: "Gas pipe installation / fitting.", original: 900, price: 800, rating: 4.4, image: plGasPipe },
      { id: "pl-house-plumbing", name: "House Plumbing Work", description: "General house plumbing work.", original: 900, price: 800, rating: 4.4, image: plHousePlumbing },
      { id: "pl-commode-install", name: "Commode Installation", description: "Install new commode set.", original: 2800, price: 2500, rating: 4.7, image: plCommodeInstall },
      { id: "pl-pipe-leak", name: "Pipeline Water Leakage", description: "Fix pipeline water leakage.", original: 900, price: 800, rating: 4.4, image: plPipeLeak },
      { id: "pl-drain-install", name: "Drain Pipe Installation", description: "Install drainage pipe.", original: 900, price: 800, rating: 4.4, image: plDrainInstall },
      { id: "pl-sink-install", name: "Sink Installation", description: "Install kitchen / washroom sink.", original: 1800, price: 1500, rating: 4.5, image: plSinkInstall },
      { id: "pl-sink-pipe-rep", name: "Sink Pipe Replacement", description: "Replace sink drain pipe.", original: 900, price: 800, rating: 4.4, image: plSinkPipeRep },
      { id: "pl-tank-install", name: "Water Tank Installation", description: "Install water tank with fittings.", original: 800, price: 500, rating: 4.4, image: plTankInstall },
      { id: "pl-wm-no-wire", name: "Automatic Washing Machine Installation (Without Wiring)", description: "Install without wiring.", original: 2000, price: 1800, rating: 4.6, image: plWashingMachine },
      { id: "pl-hv-replace", name: "Handle Valve Replacement", description: "Replace handle valve.", original: 1200, price: 1000, rating: 4.5, image: plHandleValve },
      { id: "pl-hv-install", name: "Handle Valve Installation", description: "Install new handle valve.", original: 1000, price: 800, rating: 4.4, image: plHandleValve },
      { id: "pl-bath-shower", name: "Bath Shower Installation", description: "Install bath shower set.", original: 1800, price: 1500, rating: 4.6, image: plBathShower },
      { id: "pl-washbasin", name: "Washbasin Installation", description: "Install washbasin with fittings.", original: 1800, price: 1500, rating: 4.5, image: plWashbasin },
    ],
  },
  {
    id: "electrician",
    name: "Electrician Services",
    blurb: "Certified electricians for wiring, fans, lights, breakers and repairs.",
    image: electricianImg,
    items: [
      { id: "el-ceiling-fan-install", name: "Ceiling Fan Installation", description: "Install ceiling fan with capacitor.", original: 1200, price: 900, rating: 4.6, image: elCeilingFanInstall },
      { id: "el-smd-lights", name: "SMD Lights Installation", description: "Install SMD / panel lights.", original: 600, price: 450, rating: 4.5, image: elSmdLights },
      { id: "el-led-tv-mount", name: "LED TV Mounting", description: "Wall mount LED/LCD TV.", original: 2000, price: 1500, rating: 4.7, image: elLedTvMount },
      { id: "el-switch-button", name: "Switchboard Button Replacement", description: "Replace switch buttons.", original: 500, price: 350, rating: 4.4, image: elSwitchButton },
      { id: "el-change-over", name: "Change Over Switch Installation", description: "Install changeover switch.", original: 1500, price: 1200, rating: 4.5, image: elChangeOver },
      { id: "el-pressure-motor", name: "Pressure Motor Installation", description: "Install pressure pump motor.", original: 1800, price: 1500, rating: 4.5, image: elPressureMotor },
      { id: "el-single-breaker", name: "Single Phase Breaker Replacement", description: "Replace single phase breaker.", original: 1000, price: 800, rating: 4.4, image: elSingleBreaker },
      { id: "el-distribution-box", name: "Distribution Box Installation", description: "Install DB / distribution board.", original: 2500, price: 2000, rating: 4.6, image: elDistributionBox },
      { id: "el-auto-tank-switch", name: "Water Tank Automatic Switch Installation", description: "Install auto water tank switch.", original: 1200, price: 1000, rating: 4.5, image: elAutoTankSwitch },
      { id: "el-wm-repair", name: "Washing Machine Repairing", description: "Repair washing machine faults.", original: 1500, price: 1200, rating: 4.4, image: elWmRepair },
      { id: "el-fan-dimmer", name: "Fan Dimmer Switch Installation", description: "Install fan dimmer / regulator.", original: 700, price: 500, rating: 4.4, image: elFanDimmer },
      { id: "el-ups-repair", name: "UPS Repairing", description: "Repair UPS units.", original: 1500, price: 1200, rating: 4.4, image: elUpsRepair },
      { id: "el-ups-install", name: "UPS Installation", description: "Install home UPS.", original: 1800, price: 1500, rating: 4.5, image: elUpsInstall },
      { id: "el-exhaust-fan", name: "Exhaust Fan Installation", description: "Install exhaust fan.", original: 1000, price: 800, rating: 4.4, image: elExhaustFan },
      { id: "el-new-house-wiring", name: "New House Wiring", description: "Complete new wiring for a home.", original: 700, price: 500, rating: 4.7, unit: "/ Point", image: elNewHouseWiring },
      { id: "el-pump-repair", name: "Water Pump Repairing", description: "Repair water pump.", original: 1500, price: 1200, rating: 4.4, image: elPumpRepair },
      { id: "el-wiring", name: "Electrical Wiring", description: "General electrical wiring work.", original: 1000, price: 800, rating: 4.4, image: elWiring },
      { id: "el-house-elec", name: "House Electric Work", description: "House electric maintenance.", original: 1000, price: 800, rating: 4.4, image: elHouseElec },
      { id: "el-pillar-lights", name: "Door Pillar Lights", description: "Install door / pillar lights.", original: 1200, price: 1000, rating: 4.5, image: elPillarLights },
      { id: "el-fancy-lights", name: "Fancy Light Installation", description: "Install decorative fancy lights.", original: 1800, price: 1500, rating: 4.6, image: elFancyLights },
      { id: "el-hood-repair", name: "Kitchen Hood Repairing", description: "Repair kitchen hood.", original: 1500, price: 1200, rating: 4.4, image: elHoodRepair },
      { id: "el-hood-install", name: "Kitchen Hood Installation", description: "Install new kitchen hood.", original: 2000, price: 1700, rating: 4.5, image: elHoodInstall },
      { id: "el-power-plug", name: "Power Plug Installation", description: "Install power plug socket.", original: 700, price: 500, rating: 4.4, image: elPowerPlug },
      { id: "el-light-plug", name: "Light Plug Installation", description: "Install light plug socket.", original: 600, price: 450, rating: 4.4, image: elLightPlug },
      { id: "el-ceiling-fan-rep", name: "Ceiling Fan Repairing", description: "Repair ceiling fan.", original: 1000, price: 800, rating: 4.4, image: elCeilingFanRep },
      { id: "el-tube-light", name: "Tube Light Installation / Replacement / Repairing", description: "Tube light services.", original: 700, price: 500, rating: 4.4, image: elTubeLight },
      { id: "el-sub-meter", name: "Sub-Meter Installation", description: "Install electricity sub-meter.", original: 2000, price: 1700, rating: 4.5, image: elSubMeter },
    ],
  },
  {
    id: "handyman",
    name: "Handyman Services",
    blurb: "Quick fixes — hanging, mounting and odd jobs around the house.",
    image: handymanImg,
    items: [
      { id: "hm-curtain-rod", name: "Curtain Rod Installation", description: "Install curtain rod with brackets.", original: 900, price: 700, rating: 4.5, image: hmCurtainRod },
      { id: "hm-art", name: "Art Hanging", description: "Hang artwork on the wall.", original: 600, price: 450, rating: 4.5, image: hmArt },
      { id: "hm-mirror", name: "Mirror Hanging", description: "Securely hang mirror.", original: 800, price: 600, rating: 4.5, image: hmMirror },
      { id: "hm-picture", name: "Picture Hanging", description: "Hang picture frames.", original: 500, price: 350, rating: 4.4, image: hmPicture },
      { id: "hm-shelf", name: "Shelf Hanging", description: "Install wall shelf.", original: 900, price: 700, rating: 4.5, image: hmShelf },
      { id: "hm-clock", name: "Room Clock Hanging", description: "Hang wall clock.", original: 400, price: 300, rating: 4.4, image: hmClock },
    ],
  },
  {
    id: "carpenter",
    name: "Carpenter Services",
    blurb: "Wood, doors, drawers, furniture & locks — fixed by skilled carpenters.",
    image: carpenterImg,
    items: [
      { id: "cp-wardrobe", name: "Wardrobe Repairing", description: "Repair wardrobe doors / hinges.", original: 2000, price: 1500, rating: 4.5, image: cpWardrobe },
      { id: "cp-door-install", name: "Door Installation", description: "Install wooden door.", original: 2500, price: 2000, rating: 4.6, image: cpDoorInstall },
      { id: "cp-door-repair", name: "Door Repairing", description: "Repair door / hinges / frame.", original: 1500, price: 1200, rating: 4.5, image: cpDoorRepair },
      { id: "cp-work", name: "Carpenter Work", description: "General carpentry work.", original: 1500, price: 1200, rating: 4.4, image: cpWork },
      { id: "cp-drawer-rep", name: "Drawer Repairing", description: "Repair drawer slides / front.", original: 1200, price: 900, rating: 4.4, image: cpDrawerRep },
      { id: "cp-furniture", name: "Furniture Repairing", description: "Repair furniture pieces.", original: 1800, price: 1500, rating: 4.5, image: cpFurniture },
      { id: "cp-room-lock", name: "Room Door Lock Installation", description: "Install door lock.", original: 1200, price: 900, rating: 4.5, image: cpRoomLock },
      { id: "cp-drawer-lock", name: "Drawer Lock Installation", description: "Install drawer lock.", original: 1000, price: 800, rating: 4.4, image: cpDrawerLock },
      { id: "cp-catcher", name: "Catcher Replacement", description: "Replace door catcher.", original: 800, price: 600, rating: 4.3, image: cpCatcher },
    ],
  },
  {
    id: "painter",
    name: "Painter Services",
    blurb: "Indoor, outdoor & furniture painting and polish by skilled painters.",
    image: painterImg,
    items: [
      { id: "pt-out", name: "House Paint (Outdoor)", description: "Per sqft outdoor house painting.", original: 35, price: 25, rating: 4.6, unit: "/ SQFT", image: ptOutdoor },
      { id: "pt-in", name: "House Paint (Indoor)", description: "Per sqft indoor house painting.", original: 30, price: 22, rating: 4.6, unit: "/ SQFT", image: ptIndoor },
      { id: "pt-furn-polish", name: "Furniture Polishing", description: "Polish furniture to new shine.", original: 3500, price: 2800, rating: 4.6, image: ptFurnPolish },
      { id: "pt-gray", name: "Gray Structure Paint", description: "Gray structure / fresh paint.", original: 28, price: 20, rating: 4.5, unit: "/ SQFT", image: ptGray },
      { id: "pt-door-polish", name: "Door Polish", description: "Wooden door polish.", original: 1800, price: 1500, rating: 4.5, image: ptDoorPolish },
      { id: "pt-tables", name: "Tables Polish", description: "Polish wooden tables.", original: 1500, price: 1200, rating: 4.4, image: ptTables },
      { id: "pt-window", name: "Window Paint", description: "Window frame painting.", original: 1500, price: 1200, rating: 4.4, image: ptWindow },
      { id: "pt-wooden-door", name: "Wooden Door Paint", description: "Paint wooden door.", original: 1800, price: 1500, rating: 4.5, image: ptWoodenDoor },
    ],
  },
  {
    id: "appliances",
    name: "Home Appliances",
    blurb: "Repair & service for ovens, washing machines and kitchen appliances.",
    image: appliancesImg,
    items: [
      { id: "ap-cook-range-rep", name: "Cooking Range Repairing", description: "Repair cooking range.", original: 2000, price: 1700, rating: 4.5, image: apCookRange },
      { id: "ap-wm-rep", name: "Automatic Washing Machine Repairing", description: "Repair auto washing machine.", original: 2000, price: 1700, rating: 4.5, image: apWmRepair },
      { id: "ap-oven-serv", name: "Oven Range Services", description: "Oven range service & cleaning.", original: 1800, price: 1500, rating: 4.5, image: apOvenService },
      { id: "ap-hood-install", name: "Kitchen Hood Installation", description: "Install kitchen hood.", original: 2000, price: 1700, rating: 4.5, image: apHoodInstall },
      { id: "ap-hood-rep", name: "Kitchen Hood Repairing", description: "Repair kitchen hood.", original: 1500, price: 1200, rating: 4.4, image: apHoodRepair },
      { id: "ap-wm-general", name: "Automatic Washing Machine General Service", description: "Full general service.", original: 2500, price: 2000, rating: 4.6, image: apWmGeneral },
    ],
  },
  {
    id: "geyser",
    name: "Geyser Services",
    blurb: "Gas & electric geyser install, service, repair and dismount.",
    image: geyserImg,
    items: [
      { id: "gy-inst-service", name: "Instant Geyser Service", description: "Instant geyser general service.", original: 1800, price: 1500, rating: 4.5, image: gyInstService },
      { id: "gy-inst-install", name: "Instant Geyser Installation", description: "Install instant geyser.", original: 2200, price: 1800, rating: 4.6, image: gyInstInstall },
      { id: "gy-gas-service", name: "Gas Geyser Service", description: "Gas geyser service.", original: 1800, price: 1500, rating: 4.5, image: gyGasService },
      { id: "gy-gas-install", name: "Gas Geyser Installation", description: "Install gas geyser.", original: 2200, price: 1800, rating: 4.6, image: gyGasInstall },
      { id: "gy-elec-repair", name: "Instant Electric Geyser Repairing", description: "Repair instant electric geyser.", original: 2000, price: 1700, rating: 4.5, image: gyElecRepair },
      { id: "gy-elec-install", name: "Instant Electric Geyser Installation", description: "Install instant electric geyser.", original: 2200, price: 1800, rating: 4.5, image: gyElecInstall },
      { id: "gy-elec-dismount", name: "Instant Electric Geyser Dismounting", description: "Dismount instant electric geyser.", original: 1500, price: 1200, rating: 4.4, image: gyElecDismount },
      { id: "gy-gas-repair", name: "Gas Geyser Repairing", description: "Repair gas geyser.", original: 2000, price: 1700, rating: 4.5, image: gyGasRepair },
      { id: "gy-gas-dismount", name: "Gas Geyser Dismounting", description: "Dismount gas geyser.", original: 1500, price: 1200, rating: 4.4, image: gyGasDismount },
      { id: "gy-inst-repair", name: "Instant Geyser Repairing", description: "Repair instant geyser.", original: 2000, price: 1700, rating: 4.5, image: gyInstRepair },
      { id: "gy-elec-service", name: "Instant Electric Geyser Service", description: "Instant electric geyser service.", original: 1800, price: 1500, rating: 4.5, image: gyElecService },
      { id: "gy-inst-dismount", name: "Instant Geyser Dismounting", description: "Dismount instant geyser.", original: 1500, price: 1200, rating: 4.4, image: gyInstDismount },
    ],
  },
  {
    id: "pest-control",
    name: "Pest Control Services",
    blurb: "Safe fumigation and treatments for cockroaches, bed bugs, dengue & more.",
    image: pestImg,
    items: [
      { id: "pc-general", name: "General Fumigation", description: "Whole-home general fumigation.", original: 6000, price: 4500, rating: 4.7, image: pcGeneral },
      { id: "pc-cockroach", name: "Cockroach Treatment", description: "Targeted cockroach treatment.", original: 4500, price: 3500, rating: 4.6, image: pcCockroach },
      { id: "pc-bedbug", name: "Bed Bugs Treatment", description: "Bed bug elimination treatment.", original: 5500, price: 4500, rating: 4.6, image: pcBedbug },
      { id: "pc-dengue", name: "Dengue Spray", description: "Dengue mosquito spray.", original: 5000, price: 4000, rating: 4.6, image: pcDengue },
      { id: "pc-disinfect", name: "Disinfection Services", description: "Full home disinfection service.", original: 6000, price: 5000, rating: 4.7, image: pcDisinfect },
    ],
  },
];
