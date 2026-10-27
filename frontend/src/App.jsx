import { Link, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const languages = {
  en: {
    code: 'en',
    label: 'English',
    path: '/',
    nav: {
      overview: 'Overview',
      matrix: 'Five Regions Matrix',
      calculator: 'Precision Estimator',
      market: 'Market Clock',
      seasonal: 'Seasonal Calendar',
      vegetables: 'Vegetables Calendar',
      pests: 'Pest & Disease Gallery',
    },
    heroTag: 'Static. Smart. Field-Ready.',
    heroTitle: 'Zim-Agro: Data-Rich Guidance for Zimbabwean Farmers',
    heroCopy:
      'A consultancy-grade interface built for real-world farming decisions: crop-region matching, spacing and input estimates, market timing, and practical pest remedies.',
    heroStatRain: 'Avg. rainfall models',
    heroStatRegions: 'Natural regions mapped',
    heroStatLanguages: 'Local language routes',
    opsCenterTitle: 'Field Operations Center',
    opsCenterCopy:
      'Design this as your single planning cockpit: region fit, crop timing, and input readiness in one static-first dashboard.',
    lowData: 'Low-Data Mode',
    saveField: 'Save for Field (Print/PDF)',
    matrixTitle: 'The Five Regions Interactive Matrix',
    matrixLead:
      'Select your Natural Region to reveal fit-for-climate crop options and quick agronomy references.',
    regionLabel: 'Region',
    cropsLabel: 'Recommended crops',
    planting: 'Planting window',
    spacing: 'Spacing',
    rainBand: 'Rainfall band',
    calculatorTitle: 'Seed & Fertilizer Estimator',
    calculatorLead: 'Enter acreage for instant planning values.',
    acreage: 'Acreage (ha)',
    seedNeed: 'Seed needed',
    basalNeed: 'Basal fertilizer',
    topNeed: 'Top dressing',
    confidence: 'Recommendation signal',
    optimal: 'Optimal input profile',
    caution: 'Use caution: verify budget and rainfall outlook',
    estimator: {
      cropMode: 'Crop mode',
      maize: 'Maize',
      tobacco: 'Tobacco',
      sorghum: 'Sorghum',
      starterScale: 'Starter scale',
      starterCopy: 'Useful for household planning, demo plots, or testing a new field block.',
      goodCopy: 'This acreage remains practical for most smallholder operations when input timing is disciplined.',
      warnCopy: 'Above 8 hectares, management risk rises quickly unless labour, transport, and finance are secured.',
      packs: 'packs',
      bags: 'bags',
      plantingUnit: 'Planting unit',
      procurementLoad: 'Procurement load',
      planningSignal: 'Planning signal',
      checklistTitle: 'Buying and Timing Checklist',
      checklist1: 'Secure seed and basal fertilizer before the first effective rain.',
      checklist2: 'Split top dressing into staged buying if cash is tight.',
      checklist3: 'Match final acreage to labour, transport, and storage capacity.',
      notesTitle: 'Estimator Planning Notes',
      notesLead:
        'Use the calculator for fast budgeting, then pressure-test the result against rainfall outlook, soil fertility, and the amount of money you can commit before planting.',
      statSeedRate: 'Seed rate used per hectare',
      statBasalRate: 'Basal fertilizer assumption',
      statTopRate: 'Top-dressing assumption',
      statStep: 'Adjustment step in calculator',
      noteRateTitle: 'Rate assumptions',
      noteRateDetail:
        'These are starting-point planning rates, not a replacement for soil tests or local extension advice. Higher-rainfall systems may justify stronger fertilizer programs, while lower-rainfall zones often need conservative investment.',
      noteProcTitle: 'Procurement units',
      noteProcDetail:
        'The estimator converts kilogram totals into typical purchase units to help with transport, storage, and staggered buying decisions.',
      noteCashTitle: 'Cash flow signal',
      noteCashHigh: 'High input exposure',
      noteCashModerate: 'Moderate input exposure',
      noteCashStarter: 'Manageable cash exposure for a household-scale plan.',
      noteCashGood: 'Balanced input load if cash flow and labour are aligned before planting.',
      noteCashWarn:
        'High upfront demand: split procurement early and confirm labour plus transport before committing.',
      notePracticeTitle: 'Field practice',
      notePracticeMetric: 'Split tasks before rain starts',
      notePracticeDetail:
        'Pre-position seed, fertilizer, and labour arrangements before the first effective planting rain to avoid late planting losses.',
      unitHectares: 'ha',
      unitKg: 'kg',
      unitFertilizerBags: 'fertilizer bags',
      unitBlock: 'block',
    },
    marketTitle: 'Seasonal Market Clock',
    marketLead:
      'A static price-temperature guide based on decade-style seasonal behavior, useful when daily prices are noisy.',
    sellHint: 'When to sell',
    market: {
      signalLabel: 'Best window now',
      signalCrop: 'Onion',
      signalNote: 'Winter supply tightens June–July. Cured bulbs trade at a premium before August flush.',
      dirUp: 'Rising',
      dirFlat: 'Stable',
      dirDown: 'Falling',
      strategyLabel: 'Sell strategy',
      regionLabel: 'Region fit',
      peakLabel: 'Peak window',
      indicatorLabel: 'Demand signal',
      section2Title: 'Timing Your Sell Window',
      card1Title: 'Sell at the Price Peak',
      card1Body: 'Each commodity has a 4–8 week window when supply tightens and local demand peaks. Aim to release stockpiles 2 weeks before that window closes.',
      card1Tag: 'Timing',
      card2Title: 'Storage as a Market Tool',
      card2Body: 'Even basic ventilated storage extending shelf life 2–3 weeks shifts your sale into a better window. Onion and maize benefit most; tomatoes require faster turnover.',
      card2Tag: 'Storage',
      card3Title: 'Avoid the Glut',
      card3Body: 'Prices fall sharply in the 3–4 weeks after main harvest when all producers flush at once. Stagger supply, or hold to the lean period when buyers are competitive.',
      card3Tag: 'Supply',
      card4Title: 'Know Your Channel',
      card4Body: 'Urban wholesale, informal roadside, and processor contracts have different timing windows and cash-flow implications. Match commodity and volume to the right buyer channel.',
      card4Tag: 'Channel',
      section3Title: 'Market Intelligence Notes',
      section3Lead: 'Use these pattern notes alongside the commodity cards above. Prices in any real year will vary, but these seasonal shapes repeat consistently enough to be useful for planning.',
      note1Title: 'The glut trap',
      note1Body: 'When many producers harvest the same crop at the same time, prices compress by 30–50%. You cannot control glut timing, but you can avoid selling into it with staggered planting and basic storage.',
      note1Tag: 'Price risk',
      note2Title: 'Lean season premium',
      note2Body: 'The months before the next harvest (January–February for maize, August–September for roots) are when cash buyers compete most. Reserves held to this window consistently fetch better prices.',
      note2Tag: 'Premium window',
      note3Title: 'Grading matters',
      note3Body: 'Well-graded produce fetches 15–25% more at wholesale. Sorting adds 1–2 days of extra labour but is usually net positive for cash income. Stage your grading crew before harvest, not after.',
      note3Tag: 'Yield quality',
      note4Title: 'Processor vs. spot market',
      note4Body: 'For soybean, cotton, and groundnuts, processor contracts often beat spot prices — particularly when you can guarantee volume and grade. Approach processors before planting, not after.',
      note4Tag: 'Contract',
    },
    seasonalTitle: 'Seasonal Calendar for a Typical Zimbabwean Year',
    seasonalLead:
      'A visual planning strip for labor, planting, weeding, and harvest windows across the 12-month cycle.',
    rainySeason: 'Rainy Season',
    leanSeason: 'Lean Season',
    vegetablesTitle: 'Vegetables Planting Calendar',
    vegetablesLead: 'Green cells show recommended planting months by crop.',
    crop: 'Crop',
    pestsTitle: 'Visual Pest & Disease Diagnostic Gallery',
    pestsLead: 'Tap a card to open a practical remedy page.',
    remedyTitle: 'Remedy Guide',
    organic: 'Organic / Local Solution',
    chemical: 'Chemical Option',
    notFound: 'Remedy not found.',
    backHome: 'Back to dashboard',
    footer: 'Built for offline-first agriculture support in Zimbabwe.',
  },
  sn: {
    code: 'sn',
    label: 'Shona',
    path: '/sn',
    nav: {
      overview: 'Pamusoro',
      matrix: 'Mepu yeMatunhu Mashanu',
      calculator: 'Muverengi Wechokwadi',
      market: 'Nguva yeMusika',
      seasonal: 'Karenda Yemwaka',
      vegetables: 'Karenda Yemiriwo',
      pests: 'Zvipembenene Nezvirwere',
    },
    heroTag: 'Static. Smart. Ready kumunda.',
    heroTitle: 'Zim-Agro: Zano Rine Data Rakadzama Kuvanhu Varima',
    heroCopy:
      'Chikuva chinotaridzika sechenyanzvi: kusarudza zvirimwa nematunhu, kuverenga mbeu nefetereza, nguva yekutengesa, uye nzira dzekurapa zvipembenene.',
    heroStatRain: 'Mamodel emvura',
    heroStatRegions: 'Matunhu emamiriro ekunze',
    heroStatLanguages: 'Mitauro yemuno',
    opsCenterTitle: 'Field Operations Center',
    opsCenterCopy:
      'Shandisa izvi senzvimbo imwe yekuronga: dunhu, nguva yezvirimwa, uye kugadzirira mbeu nefetereza.',
    lowData: 'Mode Yedata Shoma',
    saveField: 'Chengeta Kumunda (Print/PDF)',
    matrixTitle: 'Mepu Inoshanda yeMatunhu Mashanu',
    matrixLead:
      'Sarudza Natural Region yako kuti uone zvirimwa zvakakodzera nemazano ekurima.',
    regionLabel: 'Dunhu',
    cropsLabel: 'Zvirimwa zvinokurudzirwa',
    planting: 'Nguva yekudyara',
    spacing: 'Kupatsanura',
    rainBand: 'Mvura inotarisirwa',
    calculatorTitle: 'Muverengi weMbeu neFetereza',
    calculatorLead: 'Isa mahekitari ako kuti uwane kuverenga nekukurumidza.',
    acreage: 'Mahekitari (ha)',
    seedNeed: 'Mbeu inodiwa',
    basalNeed: 'Basal fertilizer',
    topNeed: 'Top dressing',
    confidence: 'Chiratidzo chezano',
    optimal: 'Input profile yakanaka',
    caution: 'Chenjerera: tarisa bhajeti nemvura inotarisirwa',
    estimator: {
      cropMode: 'Mhando yechirimwa',
      maize: 'Chibage',
      tobacco: 'Fodya',
      sorghum: 'Mapfunde',
      starterScale: 'Chikero chidiki',
      starterCopy: 'Zvinobatsira pakuronga kwemhuri, mapurazi edemo, kana kuyedza chikamu chemunda.',
      goodCopy: 'Mahekitari aya anoramba achibatika kuvazhinji varimi vadiki kana kuronga kweinput kwakanaka.',
      warnCopy: 'Kupfuura 8 ha njodzi yekutonga inowedzera kana basa, kutakura, nemari zvisina kugadzirirwa.',
      packs: 'mapakeji',
      bags: 'mabhegi',
      plantingUnit: 'Unit yekudyara',
      procurementLoad: 'Mutoro wekutenga',
      planningSignal: 'Chiratidzo chekuronga',
      checklistTitle: 'Runyorwa rweKutenga neNguva',
      checklist1: 'Tenga mbeu nebasal fertilizer mvura yekutanga isati yanaya zvakanaka.',
      checklist2: 'Top dressing itenge muzvikamu kana mari yakamanikana.',
      checklist3: 'Enzanisa mahekitari nebasa, kutakura, nenzvimbo yekuchengetera.',
      notesTitle: 'Zvinyorwa zveKuronga muEstimator',
      notesLead:
        'Shandisa calculator kuverenga nekukurumidza, wobva waenzanisa nemamiriro emvura, simba revhu, nemari yaungaisa usati wadyara.',
      statSeedRate: 'Chiyero chembeu pahekita',
      statBasalRate: 'Fungidziro yebasal fertilizer',
      statTopRate: 'Fungidziro yetop dressing',
      statStep: 'Nhanho yekuchinja mucalculator',
      noteRateTitle: 'Fungidziro yemarates',
      noteRateDetail:
        'Aya marates ekutanga ekuronga, haatsive soil test kana zano reextension. Matunhu ane mvura yakawanda anogona kuda fetereza yakawanda, asi ane mvura shoma anoda kuronga kwakangwarira.',
      noteProcTitle: 'Mayuniti ekutenga',
      noteProcDetail:
        'Estimator inoshandura makirogiramu kuita mayuniti ekutenga kuti zvikubatsire pakutakura, kuchengetera, nekutenga muzvikamu.',
      noteCashTitle: 'Chiratidzo chemari',
      noteCashHigh: 'Input exposure yakakwirira',
      noteCashModerate: 'Input exposure yepakati',
      noteCashStarter: 'Mutoro wemari unobatika pachikero chemhuri.',
      noteCashGood: 'Mutoro wakaringana kana mari nebasa zvakarongwa usati wadyara.',
      noteCashWarn: 'Mutoro mukuru wekutanga: patsanura kutenga nekukurumidza uye simbisa basa nekutakura.',
      notePracticeTitle: 'Tsika yemumunda',
      notePracticeMetric: 'Patsanura mabasa mvura isati yatanga',
      notePracticeDetail:
        'Gadzirira mbeu, fetereza, nebasa mvura yekutanga isati yasvika kuti udzivise kunonoka kudyara.',
      unitHectares: 'ha',
      unitKg: 'kg',
      unitFertilizerBags: 'mabhegi efetereza',
      unitBlock: 'blok',
    },
    marketTitle: 'Nguva yeMusika',
    marketLead:
      'Gwaro risina live data rinoratidza maitiro emitengo mumwaka yakasiyana kuti ubatsirwe pakutengesa.',
    sellHint: 'Nguva yakanaka yekutengesa',
    market: {
      signalLabel: 'Hwindo rakanakisa iye zvino',
      signalCrop: 'Hanyanisi',
      signalNote: 'Hanyanisi inoshomeka muna June–July. Iriwo yakaomeswa inotenga mitengo yakakwirira.',
      dirUp: 'Ichikwira',
      dirFlat: 'Yakamira',
      dirDown: 'Ichidzika',
      strategyLabel: 'Nzira yekutengesa',
      regionLabel: 'Dunhu rakakodza',
      peakLabel: 'Nguva yepamwechete',
      indicatorLabel: 'Chiratidzo chechinodiwa',
      section2Title: 'Kusarudza Nguva Yekutengesa',
      card1Title: 'Tengesa panguva yemitengo yakakwirira',
      card1Body: 'Chirimwa chimwe nechimwe chine hwindo hwemavhiki 4–8 apo mitengo inokwirira. Ratidzira kuisa zvinhu mushopu mazuva gumi nemashanu usati hwindo rakavharwa.',
      card1Tag: 'Nguva',
      card2Title: 'Kuchengetera seTariro yeMusika',
      card2Body: 'Imba yekuchengetera inoratidzira kuita mazuva 2–3 ekuwedzera inokufananidzira nekutengesa panguva yakanaka. Hanyanisi nechimanga zvinobatsirwa zvakanyanya.',
      card2Tag: 'Kuchengetera',
      card3Title: 'Dzivisa Nguva yeMwaka',
      card3Body: 'Mitengo inowira zvakanyanya mumavhiki 3–4 mushure mekukohwa kukuru. Patsanura kuisa, kana chengetedza kusvika nguva inoshomeka zviriwo.',
      card3Tag: 'Mutakuro',
      card4Title: 'Ziva Nzira Yako',
      card4Body: 'Kutengesa muguta, kumugwagwa, nekuitenji zvinoshandira nguva dzakasiyana. Enzanisa zviriwo nemuwero wezvinhu nekutengerwa kwakakodza.',
      card4Tag: 'Nzira',
      section3Title: 'Zano zeMusika',
      section3Lead: 'Shandisa manothi awa pamwe nezviriwo zviripo pamusoro. Mitengo inochinja gore gore, asi mashura aya emwaka anoramba achiitika basa pakuronga.',
      note1Title: 'Ngozi yemwaka wekuvhuvhuta',
      note1Body: 'Varimi vakawanda vakakohwa chirimwa chimwe panguva imwe chete mitengo inowira ne30–50%. Haugone kuvhuvhuta mwaka izwoyo, asi unogona kudzivisa kutengesa unenge wakatarisana nawo chete.',
      note1Tag: 'Ngozi',
      note2Title: 'Mubairo wenguva yekushomeka',
      note2Body: 'Mwedzi usati makohwa atevera (Ndira-Kukadzi wechimanga) vatengesi vanosangana zvakanyanya. Zviriwa zvakachengeterwa hwindo iri rinogara richiwana mitengo yakanakisa.',
      note2Tag: 'Hwindo rakanaka',
      note3Title: 'Kugadzira zvinhu zvinokosha',
      note3Body: 'Zviriwa zvakagadziriwa zvakanaka zvinowana 15–25% pamusoro pwese. Kurongedza kunowedzera mazuva 1–2 ebasa asi kazhinji kunopa mari yakawanda.',
      note3Tag: 'Mhando',
      note4Title: 'Processor vs. musika wemhiri',
      note4Body: 'Pabhinzi, tonje, uye groundnut, makwata aitenji kazhinji akapfuura mitengo yemusika — kunyange kana uchigona kupomera muwero nemhando. Onderedza processors usati wadyara.',
      note4Tag: 'Makwata',
    },
    seasonalTitle: 'Karenda Yemwaka Wegore MuZimbabwe',
    seasonalLead:
      'Mitsara inooneka inobatsira kuronga basa, kudyara, kusakura uye kukohwa mumwedzi gumi nemiviri.',
    rainySeason: 'Mwaka Wemvura',
    leanSeason: 'Mwaka Wekushomeka',
    vegetablesTitle: 'Karenda Yekudyara Miriwo',
    vegetablesLead: 'Masero akasvibira anoratidza mwedzi inokurudzirwa yekudyara.',
    crop: 'Chirimwa',
    pestsTitle: 'Gallery yeZvipembenene Nezvirwere',
    pestsLead: 'Dzvanya kadhi kuti uvhure peji remushonga.',
    remedyTitle: 'Gwaro reMushonga',
    organic: 'Organic / Yemuno',
    chemical: 'Chemical Option',
    notFound: 'Remedy haina kuwanikwa.',
    backHome: 'Dzokera padheshibhodhi',
    footer: 'Yakagadzirirwa offline-first kutsigira varimi veZimbabwe.',
  },
  nd: {
    code: 'nd',
    label: 'Ndebele',
    path: '/nd',
    nav: {
      overview: 'Phezulu',
      matrix: 'I-Matrix Yamaregion Amahlanu',
      calculator: 'Isibali Esiqondileyo',
      market: 'Iwashi Lemakethe',
      seasonal: 'Ikhalenda Lesizini',
      vegetables: 'Ikhalenda Yemibhida',
      pests: 'Izifo Lezinambuzane',
    },
    heroTag: 'Static. Smart. Kulungele ensimini.',
    heroTitle: 'Zim-Agro: Ulwazi Olunzulu Kubalimi BaseZimbabwe',
    heroCopy:
      'Isiteji esibukeka sobungcweti: ukukhetha izilimo ngemihlaba, ukubala imbewu lefetiliza, isikhathi sokuthengisa, lezixazululo zezinambuzane.',
    heroStatRain: 'Amamodel emvula',
    heroStatRegions: 'Ama-region emvelo',
    heroStatLanguages: 'Izilimi zendawo',
    opsCenterTitle: 'Field Operations Center',
    opsCenterCopy:
      'Sebenzisa lokhu njengendawo eyodwa yokuhlela: iregion, isikhathi sezilimo, lokulungela imbewu lefetiliza.',
    lowData: 'Imodi Yedatha Encane',
    saveField: 'Gcina Ensimini (Print/PDF)',
    matrixTitle: 'I-Matrix Yamaregion Amahlanu',
    matrixLead:
      'Khetha iNatural Region yakho ukuze ubone izilimo ezifanele kanye lezincazelo ezimqoka.',
    regionLabel: 'Region',
    cropsLabel: 'Izilimo ezikhuthaziweyo',
    planting: 'Isikhathi sokuhlanyela',
    spacing: 'Ukuqhela',
    rainBand: 'Ubunengi bemvula',
    calculatorTitle: 'Isibali Sembewu LeFetiliza',
    calculatorLead: 'Faka amahektare ukuze uthole amanani masinyane.',
    acreage: 'Amahektare (ha)',
    seedNeed: 'Imbewu edingekayo',
    basalNeed: 'Basal fertilizer',
    topNeed: 'Top dressing',
    confidence: 'Isignali yesincomo',
    optimal: 'Input profile enhle',
    caution: 'Qaphela: hlola imali lemvula okulindelekileyo',
    estimator: {
      cropMode: 'Uhlobo lwesilimo',
      maize: 'Umumbu',
      tobacco: 'Ugwayi',
      sorghum: 'Amabele',
      starterScale: 'Isikali sokuqala',
      starterCopy: 'Kusiza ekuhleleni kwekhaya, amapulazi wokubonisa, loba ukuhlola ingxenye yensimu.',
      goodCopy: 'Lawa mahektare ayasebenziseka kubalimi abanengi abancane uma ama-input ehlelwe kuhle.',
      warnCopy: 'Ngaphezu kuka-8 ha ingozi yokuphatha iyakhula uma umsebenzi, ukuthutha, lemali kungakagciniwe.',
      packs: 'amaphakethi',
      bags: 'amabhagi',
      plantingUnit: 'Iyunithi yokuhlanyela',
      procurementLoad: 'Umthwalo wokuthenga',
      planningSignal: 'Isignali yokuhlela',
      checklistTitle: 'Uhlu Lokuthenga Lesikhathi',
      checklist1: 'Thenga imbewu lebasal fertilizer izulu lokuqala lingakani.',
      checklist2: 'Yahlukanisa ukuthenga i-top dressing ngezigaba uma imali incane.',
      checklist3: 'Linganisa amahektare akho lomsebenzi, ukuthutha, lendawo yokugcina.',
      notesTitle: 'Amanothi Okuhlela e-Estimator',
      notesLead:
        'Sebenzisa isibali ukubudgeta masinyane, bese uqhathanisa umphumela lemvula, isimo senhlabathi, lemali ongayifaka ngaphambi kokuhlanyela.',
      statSeedRate: 'I-seed rate ngehektare',
      statBasalRate: 'Umcabango webasal fertilizer',
      statTopRate: 'Umcabango wetop dressing',
      statStep: 'Isinyathelo sokuguqula esibalini',
      noteRateTitle: 'Imicabango yamarate',
      noteRateDetail:
        'Lawa marate okuqala okuhlela, awasusi isidingo se-soil test kumbe iseluleko se-extension. Izindawo ezinemvula enengi zingadinga ifetiliza enengi, ezomileyo zidinga ukuhlela okucophelela.',
      noteProcTitle: 'Amayunithi okuthenga',
      noteProcDetail:
        'I-estimator iguqula ama-kilogram abe ngamayunithi okuthenga ukuze usize ekuthutheni, ekugcineni, kanye lokuthenga ngezigaba.',
      noteCashTitle: 'Isignali yemali',
      noteCashHigh: 'Ukuchayeka kwe-input okuphezulu',
      noteCashModerate: 'Ukuchayeka kwe-input okumaphakathi',
      noteCashStarter: 'Umthwalo wemali olawulekayo kwesikali sekhaya.',
      noteCashGood: 'Umthwalo olinganayo uma imali lomsebenzi kuhlelwe ngaphambi kokuhlanyela.',
      noteCashWarn: 'Umthwalo omkhulu ekuqaleni: yahlukanisa ukuthenga masinyane uqinisekise umsebenzi lokuthutha.',
      notePracticeTitle: 'Umkhuba wensimu',
      notePracticeMetric: 'Yahlukanisa imisebenzi izulu lingakaqali',
      notePracticeDetail:
        'Lungisa imbewu, ifetiliza, lomsebenzi ngaphambi kwezulu lokuqala ukuze ugweme ukulibala ukuhlanyela.',
      unitHectares: 'ha',
      unitKg: 'kg',
      unitFertilizerBags: 'amabhagi efetiliza',
      unitBlock: 'iblokhi',
    },
    marketTitle: 'Iwashi Lemakethe',
    marketLead:
      'Umhlahlandlela we-static "price temperature" osuselwe eminyakeni eminingi yemikhuba yesikhathi sonyaka.',
    sellHint: 'Isikhathi esihle sokuthengisa',
    market: {
      signalLabel: 'Iwindi elilungileyo manje',
      signalCrop: 'Uhanyanisi',
      signalNote: 'Uhanyanisi uyancipha ngoJuni–Julayi. Amabhabhisi ashisiliweyo athengwa ngentengo ephezulu.',
      dirUp: 'Iyakhula',
      dirFlat: 'Iqinile',
      dirDown: 'Yehlela',
      strategyLabel: 'Indlela yokuthengisa',
      regionLabel: 'Iregion efaneleyo',
      peakLabel: 'Iwindi eliphezulu',
      indicatorLabel: 'Isignali yesidingo',
      section2Title: 'Ukukhetha Isikhathi Sokuthengisa',
      card1Title: 'Thengisa ngentengo ephezulu',
      card1Body: 'Isilimo ngasinye sinewindi leviki ezingu-4–8 lapho uhlinzeko luqina ukudinwa kwendawo kuyakhula. Hlose ukukhipha izimpahla eksitolo amasonto amabili ngaphambi kokuvala kwewindi.',
      card1Tag: 'Isikhathi',
      card2Title: 'Ukugcini Njengethuluzi Lemakethe',
      card2Body: 'Ngisho ukugcina okuncane okunezimbobo okunandisa ukuphila kwamasonto amabili-amathathu kuyashintsha ukuthengisa kwakho liwindi elilungileyo. Uhanyanisi lommbila kuzuzisa kakhulu.',
      card2Tag: 'Ukugcina',
      card3Title: 'Baleka Ukuphuphuma',
      card3Body: 'Amantengo ayehlela kakhulu emavikini amathathu-amane ngemva kokuvuna okukhulu. Ahlukanisa uhlinzeko lakho, noma bamba kuze kufike isikhathi sokuswela lapho abathenga bekhuphisana.',
      card3Tag: 'Uhlinzeko',
      card4Title: 'Yazi Umsele Wakho',
      card4Body: 'Ukuthengisa edolobheni, emgwaqeni, lakumashishini asekhona kunamawindela ezikhathi ezihlukene. Hlanganisa isilimo nevolumu nomthekelezi ofaneleyo.',
      card4Tag: 'Umsele',
      section3Title: 'Amanothi Olwazi Lwemakethe',
      section3Lead: 'Sebenzisa lezi zinothi ezinhlangothini namakathe ezimpahla ngenhla. Amantengo ashintsha minyaka yonke, kodwa lezi zimo zomsimu ziphinda njalo ngokwanele ukuba zilungele ukuhlela.',
      note1Title: 'Ugibe wokuphuphuma',
      note1Body: 'Uma abalimi abaningi bevuna isilimo esifanayo ngasikhathi sinye, amantengo ayehlela ngo-30–50%. Awukwazi ukulawula isikhathi sokuphuphuma, kodwa ungagwema ukuthengisa ungene kuso ngokuhlanyela ngemikhathi ehlukene.',
      note1Tag: 'Ingozi',
      note2Title: 'Inzuzo yesikhathi sokuswela',
      note2Body: 'Izinyanga ngaphambi kokuvuna okulandelayo (Januwari–Februwari wommbila) yilapho abathenga bakhokhelana khona kakhulu. Izimpahla ezigcinwe liwindi leli zithola amantengo angcono njalo.',
      note2Tag: 'Iwindi elilungileyo',
      note3Title: 'Ukuhlukanisa kubalulekile',
      note3Body: 'Izithelo ezihlukanisiwe kahle zithola u-15–25% ngaphezulu. Ukuhlukanisa kwengeza izinsuku ezi-1–2 zomsebenzi kodwa ngokuvamile kuyinzuzo kwengeniso.',
      note3Tag: 'Ikhwalithi',
      note4Title: 'Umshini vs. imakethe yespot',
      note4Body: 'Kumashontshi, kulomshini, kanye nezinyanga, izivumelwano zemishini kaningi zidlula amantengo espot — ikakhulukazi uma ungaqinisekisa ivolumu nesilinganiso. Xhumana nemishini ngaphambi kokuhlanyela.',
      note4Tag: 'Isivumelwano',
    },
    seasonalTitle: 'Ikhalenda Lesizini Lonyaka Ojwayelekileyo eZimbabwe',
    seasonalLead:
      'Imigqa yenyanga isiza ukuhlela umsebenzi, ukuhlanyela, ukuhlakula lokuvuna phakathi konyaka wonke.',
    rainySeason: 'Isizini Yezulu',
    leanSeason: 'Isizini Yokuswela',
    vegetablesTitle: 'Ikhalenda Lokuhlanyela Imibhida',
    vegetablesLead: 'Amaseli aluhlaza abonisa inyanga ezihle zokuhlanyela.',
    crop: 'Isilimo',
    pestsTitle: 'Igalari YeZinambuzane Lezifo',
    pestsLead: 'Chofoza ikhadi ukuze uvule ikhasi lesixazululo.',
    remedyTitle: 'Umhlahlandlela Wesixazululo',
    organic: 'Organic / Okwasekhaya',
    chemical: 'Chemical Option',
    notFound: 'Isixazululo asitholakalanga.',
    backHome: 'Buyela ekhaya',
    footer: 'Yakhelwe ukusekela abalimi nge-offline-first eZimbabwe.',
  },
};

const regionData = [
  {
    id: 'I',
    color: '#2d6a4f',
    image: '/images/matrix/matrix-region-1.jpg',
    rain: '900-1200 mm',
    planting: 'Sep-Nov',
    spacing: 'Maize: 75 cm x 25 cm',
    crops: ['Tea', 'Coffee', 'Horticulture'],
  },
  {
    id: 'II',
    color: '#40916c',
    image: '/images/matrix/matrix-region-2.jpg',
    rain: '700-1050 mm',
    planting: 'Oct-Dec',
    spacing: 'Tobacco: 120 cm x 55 cm',
    crops: ['Tobacco', 'Maize', 'Soybean', 'Groundnut'],
  },
  {
    id: 'III',
    color: '#52b788',
    image: '/images/matrix/matrix-region-3.jpg',
    rain: '500-800 mm',
    planting: 'Nov-Dec',
    spacing: 'Cotton: 90 cm x 30 cm',
    crops: ['Cotton', 'Sorghum', 'Sunflower'],
  },
  {
    id: 'IV',
    color: '#74c69d',
    image: '/images/matrix/matrix-region-4.jpg',
    rain: '450-650 mm',
    planting: 'Nov-Jan',
    spacing: 'Pearl millet: 60 cm x 20 cm',
    crops: ['Pearl Millet', 'Sorghum', 'Goat Production'],
  },
  {
    id: 'V',
    color: '#95d5b2',
    image: '/images/matrix/matrix-region-5.webp',
    rain: '300-500 mm',
    planting: 'Dec-Jan',
    spacing: 'Finger millet: 45 cm x 10 cm',
    crops: ['Sorghum', 'Finger Millet', 'Livestock'],
  },
];

const regionDetails = [
  {
    id: 'I',
    name: 'Eastern Highlands',
    provinces: 'Manicaland — Nyanga, Chimanimani, Mutare area',
    rainfall: '900–1200 mm',
    elevation: '1200–2000 m',
    soils: 'Deep red clay loams; well-drained and acidic',
    headlineCrops: 'Tea, Coffee, Macadamia, Horticulture',
    varieties: 'Kenya Fahari (tea); Arabica coffee; Kanyemba horticulture lines',
    primaryRisk: 'Highland frost June–July; erosion on steep ground; mist blight on tea',
    inputNote: 'High-value but capital-intensive. Irrigation supplements dry spells. pH management critical for tea and coffee.',
  },
  {
    id: 'II',
    name: 'Central Plateau / Highveld',
    provinces: 'Mashonaland Central, East & West; parts of Midlands',
    rainfall: '700–1050 mm',
    elevation: '1000–1500 m',
    soils: 'Medium to heavy clays; good water-holding capacity',
    headlineCrops: 'Tobacco, Maize, Soybean, Groundnut',
    varieties: 'SC403, SC513 (maize); KRR, T66 (tobacco); Spike (soybean)',
    primaryRisk: 'Mid-season dry spells Jan–Feb; tobacco leaf-quality risk in high-humidity years',
    inputNote: 'Standard basal and top-dressing rates apply. Tobacco fire-curing is energy-intensive — plan fuel costs. Scout continuously for armyworm.',
  },
  {
    id: 'III',
    name: 'Transition Zone',
    provinces: 'Parts of Midlands, northern Masvingo, central Zimbabwe',
    rainfall: '500–800 mm',
    elevation: '700–1200 m',
    soils: 'Sandy to medium loams; moderate water-holding; variable nutrients',
    headlineCrops: 'Cotton, Sorghum, Sunflower, Maize (lower potential)',
    varieties: 'SV2 sorghum; Bt cotton; Pannar hybrid sunflower',
    primaryRisk: 'Unreliable rainfall onset; intra-seasonal dry spells; late-season cut-out',
    inputNote: 'Reduce fertilizer rates relative to Region II. Favour drought-tolerant hybrids. Staggered planting dates spread risk.',
  },
  {
    id: 'IV',
    name: 'Semi-Arid Lowveld',
    provinces: 'Matabeleland North & South, southern Masvingo',
    rainfall: '450–650 mm',
    elevation: '600–1000 m',
    soils: 'Sandy soils; low water-holding; low organic matter',
    headlineCrops: 'Pearl Millet, Sorghum, Cowpea, Goat Production',
    varieties: 'Okashana 1 (pearl millet); PAN 8625 (sorghum); local cowpea landraces',
    primaryRisk: 'Frequent drought years; January–February moisture failure; livestock pressure on rangeland',
    inputNote: 'Minimal chemical fertilizer. Conservation agriculture and manure integration are critical. Water harvesting justifies most investment.',
  },
  {
    id: 'V',
    name: 'Arid Lowveld',
    provinces: 'Beit Bridge, Hwange, extreme southern Matabeleland',
    rainfall: '300–500 mm',
    elevation: '300–700 m',
    soils: 'Very sandy; severe erosion risk; low cation exchange capacity',
    headlineCrops: 'Sorghum, Finger Millet, Livestock, Wildlife / Game Farming',
    varieties: 'Indigenous short-season sorghum landraces; finger millet ecotypes',
    primaryRisk: 'Chronic moisture deficit; high evapotranspiration; wildlife pressure on crops',
    inputNote: 'Very conservative inputs only. Water harvesting (zai pits, half-moon basins) is the highest-return technology. Livestock and game carry most economic value.',
  },
];

const marketData = [
  {
    name: 'Tomato',
    peak: 'April–May',
    peakMonths: [4, 5],
    direction: 'up',
    indicator: 72,
    hint: 'Hold late-March harvest for April release where storage allows.',
    strategy: 'Stage supply: release weekly batches rather than all at once to prevent local gluts.',
    region: 'Regions I–III',
    image: '/images/market_clock/market-tomato-peak.jpg',
  },
  {
    name: 'Onion',
    peak: 'June–July',
    peakMonths: [6, 7],
    direction: 'up',
    indicator: 86,
    hint: 'Dry and stage supply for winter demand spikes.',
    strategy: 'Cure bulbs properly for 2–3 weeks post-harvest; well-cured onions trade at premium in mid-winter.',
    region: 'Regions II–III',
    image: '/images/market_clock/market-onion-peak.jpg',
  },
  {
    name: 'Maize',
    peak: 'October–November',
    peakMonths: [10, 11],
    direction: 'up',
    indicator: 64,
    hint: 'Sell in tranches post-harvest; avoid panic sales in glut periods.',
    strategy: 'Retain 20–30% of harvest for January–February when lean-season demand lifts prices.',
    region: 'Regions II–IV',
    image: '/images/market_clock/market-maize-peak.jpg',
  },
  {
    name: 'Cabbage',
    peak: 'May–August',
    peakMonths: [5, 6, 7, 8],
    direction: 'up',
    indicator: 68,
    hint: 'Winter demand is steady; size-grade at harvest to target urban wholesale.',
    strategy: 'Stagger planting at 3-week intervals to spread your supply window and improve negotiating position.',
    region: 'Regions I–II',
    image: '/images/market_clock/market-tomato-peak.jpg',
  },
  {
    name: 'Groundnut',
    peak: 'July–September',
    peakMonths: [7, 8, 9],
    direction: 'up',
    indicator: 74,
    hint: 'Cooking-oil processors and informal traders compete — compare both channels before committing.',
    strategy: 'Dry to under 8% moisture before storage; a poorly dried crop loses value fast.',
    region: 'Regions II–III',
    image: '/images/market_clock/market-onion-peak.jpg',
  },
  {
    name: 'Soybean',
    peak: 'April–June',
    peakMonths: [4, 5, 6],
    direction: 'flat',
    indicator: 58,
    hint: 'Contract pricing is often better than spot; approach processors before harvest.',
    strategy: 'Grade carefully — moisture and splits determine whether you receive full or discounted price.',
    region: 'Region II',
    image: '/images/market_clock/market-maize-peak.jpg',
  },
  {
    name: 'Sweet Potato',
    peak: 'August–October',
    peakMonths: [8, 9, 10],
    direction: 'up',
    indicator: 79,
    hint: 'Lean-season demand from informal markets peaks — target urban growth points.',
    strategy: 'Harvest at a slight undersize to extend shelf life during transport to distant markets.',
    region: 'Regions II–IV',
    image: '/images/market_clock/market-tomato-peak.jpg',
  },
  {
    name: 'Cotton',
    peak: 'May–July',
    peakMonths: [5, 6, 7],
    direction: 'flat',
    indicator: 60,
    hint: 'Contracted farmers should deliver promptly; avoid holding costs against a flat price.',
    strategy: 'Grade A cotton commands price premiums — focus on clean picking and rapid turnaround.',
    region: 'Region III',
    image: '/images/market_clock/market-maize-peak.jpg',
  },
];

const remedyData = {
  'fall-armyworm': {
    title: 'Fall Armyworm',
    short: 'Leaf shredding and central whorl damage in maize.',
    organic: 'Use neem extract spray every 5-7 days and apply wood ash into the whorl early morning.',
    chemical: 'Rotate registered products with different modes of action; spray during early larval stage.',
  },
  'leaf-rust': {
    title: 'Leaf Rust',
    short: 'Orange-brown pustules on leaves reducing photosynthesis.',
    organic: 'Improve airflow, remove heavily infected leaves, and use compost tea as support treatment.',
    chemical: 'Apply approved triazole or strobilurin fungicide at first visible symptoms.',
  },
  'tuta-absoluta': {
    title: 'Tuta Absoluta',
    short: 'Tomato leaf mines and fruit boring damage.',
    organic: 'Deploy pheromone traps and remove infested shoots immediately.',
    chemical: 'Use selective insecticides in rotation and maintain strict scouting intervals.',
  },
  'aphid-colony': {
    title: 'Aphid Colony',
    short: 'Sticky honeydew and curling young leaves.',
    organic: 'Spray soapy water solution and encourage ladybird beetles.',
    chemical: 'Use systemic insecticide only after threshold counts are exceeded.',
  },
};

const monthLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const seasonalTimeline = [
  { activity: 'Land Preparation', windows: [[9, 11]], tone: 'soil' },
  { activity: 'Planting: Staple Foods/Cotton', windows: [[1, 2], [11, 12]], tone: 'soil' },
  { activity: 'Planting: Winter Wheat', windows: [[5, 7]], tone: 'soil' },
  { activity: 'Planting: Tobacco', windows: [[9, 12]], tone: 'soil' },
  { activity: 'Weeding', windows: [[1, 3], [11, 12]], tone: 'soil' },
  { activity: 'Green Harvest', windows: [[2, 4]], tone: 'mint' },
  { activity: 'Main Harvest', windows: [[4, 7]], tone: 'forest' },
  { activity: 'Winter Wheat Harvest', windows: [[9, 10]], tone: 'forest' },
  { activity: 'Harvest and Sale of Cotton', windows: [[4, 10]], tone: 'forest' },
  { activity: 'Harvest and Sale of Tobacco', windows: [[2, 9]], tone: 'forest' },
  { activity: 'Production and Sale of Vegetables', windows: [[6, 10]], tone: 'graphite' },
  { activity: 'Agricultural Labor: Harvest', windows: [[4, 7]], tone: 'graphite' },
  { activity: 'Milk Production', windows: [[1, 3], [10, 12]], tone: 'graphite' },
  { activity: 'Non-agricultural Labor', windows: [[6, 10]], tone: 'graphite' },
];

const vegetableCalendar = [
  { crop: 'Beetroot', months: [5, 6, 7] },
  { crop: 'Broccoli', months: [2, 3, 4, 5, 6, 7, 8] },
  { crop: 'Butternut', months: [1, 2, 8, 9, 10, 11, 12] },
  { crop: 'Cabbage', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { crop: 'Carrots', months: [2, 3, 4, 5, 6, 7, 8, 9] },
  { crop: 'Cauliflower', months: [2, 3, 4, 5, 6, 7] },
  { crop: 'Chillies', months: [8, 9] },
  { crop: 'Cucumber', months: [1, 2, 9, 10, 11, 12] },
  { crop: 'Eggplant', months: [8, 9, 10, 11, 12] },
  { crop: 'Green Beans', months: [1, 2, 3, 4, 9, 10, 11, 12] },
  { crop: 'Green Mealies', months: [9, 10, 11, 12] },
  { crop: 'Lettuce', months: [3, 4, 5, 6, 7] },
  { crop: 'Baby Marrow', months: [1, 2, 8, 9, 10, 11, 12] },
];

function languageFromPath(pathname) {
  if (pathname.startsWith('/sn')) return 'sn';
  if (pathname.startsWith('/nd')) return 'nd';
  return 'en';
}

function languagePrefix(code) {
  if (code === 'sn') return '/sn';
  if (code === 'nd') return '/nd';
  return '';
}

const pageSegments = {
  overview: '',
  matrix: 'matrix',
  calculator: 'precision-estimator',
  market: 'market-clock',
  seasonal: 'seasonal-calendar',
  vegetables: 'vegetables-calendar',
  pests: 'pest-disease-gallery',
  contact: 'contact-us',
};

function pagePath(langCode, pageKey) {
  const prefix = languagePrefix(langCode);
  const segment = pageSegments[pageKey];

  if (!segment) {
    return prefix || '/';
  }

  return prefix ? `${prefix}/${segment}` : `/${segment}`;
}

function remedyPath(langCode, slug) {
  const prefix = languagePrefix(langCode);
  return prefix ? `${prefix}/remedy/${slug}` : `/remedy/${slug}`;
}

const siteUrl = 'https://zim-agro.kairosgroup.co.zw';

function setMetaTag(attr, key, content) {
  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }

  node.setAttribute('content', content);
}

function normalizePath(path) {
  return path === '/' ? '/' : `${path.replace(/\/$/, '')}/`;
}

function localizedPath(path, langCode) {
  const basePath = path.replace(/^\/(sn|nd)(?=\/|$)/, '') || '/';
  const prefix = languagePrefix(langCode);
  return normalizePath(prefix ? `${prefix}${basePath === '/' ? '' : basePath}` : basePath);
}

function PageSeo({ title, description, path, noIndex = false }) {
  useEffect(() => {
    const currentLanguage = path === '/sn' || path.startsWith('/sn/')
      ? 'sn'
      : path === '/nd' || path.startsWith('/nd/')
        ? 'nd'
        : 'en';
    const canonicalPath = normalizePath(path);

    document.documentElement.lang = currentLanguage;
    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);

    const canonicalUrl = `${siteUrl}${canonicalPath}`;
    setMetaTag('property', 'og:url', canonicalUrl);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);

    document.head.querySelectorAll('link[data-seo-alternate="true"]').forEach((node) => node.remove());
    if (!noIndex) {
      [...Object.keys(languages), 'x-default'].forEach((langCode) => {
        const alternateLanguage = langCode === 'x-default' ? 'en' : langCode;
        const alternateLink = document.createElement('link');
        alternateLink.setAttribute('rel', 'alternate');
        alternateLink.setAttribute('hreflang', langCode);
        alternateLink.setAttribute('href', `${siteUrl}${localizedPath(path, alternateLanguage)}`);
        alternateLink.setAttribute('data-seo-alternate', 'true');
        document.head.appendChild(alternateLink);
      });
    }
  }, [title, description, path, noIndex]);

  return null;
}

function NotFoundPage() {
  return (
    <main className="page-shell">
      <PageSeo
        title="Page Not Found | Zim-Agro"
        description="The requested Zim-Agro page could not be found."
        path={window.location.pathname}
        noIndex
      />
      <section className="card" style={{ maxWidth: '42rem', margin: '4rem auto', textAlign: 'center' }}>
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <Link className="back-link" to="/">Return to Zim-Agro</Link>
      </section>
    </main>
  );
}

function AppFrame({ langCode, currentPage, children, lowData, setLowData }) {
  const t = languages[langCode];
  const homePath = pagePath(langCode, 'overview');
  const isOverview = currentPage === 'overview';
  const navItems = [
    { key: 'overview', label: t.nav.overview },
    { key: 'matrix', label: t.nav.matrix },
    { key: 'calculator', label: t.nav.calculator },
    { key: 'market', label: t.nav.market },
    { key: 'seasonal', label: t.nav.seasonal },
    { key: 'vegetables', label: t.nav.vegetables },
    { key: 'pests', label: t.nav.pests },
    { key: 'contact', label: t.nav.contact ?? 'Contact Us' },
  ];
  const currentLabel = navItems.find((item) => item.key === currentPage)?.label ?? t.nav.overview;

  return (
    <div className={`app-shell ${lowData ? 'low-data' : ''}`}>
      <header className="top-header card print-surface no-print" id="top">
        <div className="top-header-bar">
          <strong className="brand">Zim-Agro</strong>
          <div className="header-right">
            <div className="header-actions no-print">
              {/* <label className="toggle">
                <input
                  type="checkbox"
                  checked={lowData}
                  onChange={(event) => setLowData(event.target.checked)}
                />
                <span>{t.lowData}</span>
              </label> */}
              <button type="button" className="save-btn" onClick={() => window.print()}>
                {t.saveField}
              </button>
            </div>
          </div>
        </div>

        <nav className="top-tabs">
          {navItems.map((item) => (
            <Link
              key={item.key}
              className={item.key === currentPage ? 'active' : ''}
              to={pagePath(langCode, item.key)}
            >
              {item.label}
            </Link>
          ))}
          {currentPage !== 'overview' ? <Link to={homePath}>{t.backHome}</Link> : null}
        </nav>
      </header>

      {isOverview ? (
        <header className="hero card print-surface">
          <div className="hero-layout">
            <div className="hero-content">
              <p className="eyebrow">{t.heroTag}</p>
              <h1>{t.heroTitle}</h1>
              <p className="hero-copy">{t.heroCopy}</p>

              <div className="hero-metrics no-print">
                <article>
                  <strong>12-Month</strong>
                  <span>{t.heroStatRain}</span>
                </article>
                <article>
                  <strong>5</strong>
                  <span>{t.heroStatRegions}</span>
                </article>
                <article>
                  <strong>3</strong>
                  <span>{t.heroStatLanguages}</span>
                </article>
              </div>


            </div>

            <aside className="hero-visual no-print" aria-label="Farm visuals and highlights">
              <div className="hero-shot hero-shot-main" />
              <div className="hero-side-stack">
                <div className="hero-shot hero-shot-alt" />
                <article className="ops-card">
                  <p className="eyebrow">{t.opsCenterTitle}</p>
                  <p>{t.opsCenterCopy}</p>
                </article>
              </div>
            </aside>
          </div>
        </header>
      ) : null}
      {children}
      <footer className="footer print-surface">{t.footer}</footer>
    </div>
  );
}

function OverviewPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const langSegment = languagePrefix(langCode);
  const pageCards = [
    {
      key: 'matrix',
      title: t.nav.matrix,
      copy: t.matrixLead,
      image: '/images/overview/overview-matrix-thumb.jpg',
    },
    {
      key: 'calculator',
      title: t.nav.calculator,
      copy: t.calculatorLead,
      image: '/images/overview/overview-estimator-thumb.jpg',
    },
    {
      key: 'market',
      title: t.nav.market,
      copy: t.marketLead,
      image: '/images/overview/overview-market-thumb.jpg',
    },
    {
      key: 'seasonal',
      title: t.nav.seasonal,
      copy: t.seasonalLead,
      image: '/images/overview/overview-seasonal-thumb.jpg',
    },
    {
      key: 'vegetables',
      title: t.nav.vegetables,
      copy: t.vegetablesLead,
      image: '/images/overview/overview-vegetables-thumb.jpg',
    },
    {
      key: 'pests',
      title: t.nav.pests,
      copy: t.pestsLead,
      image: '/images/overview/overview-pests-thumb.jpg',
    },
    {
      key: 'contact',
      title: t.nav.contact ?? 'Contact Us',
      copy: 'Request platform updates, submit feedback, and subscribe to planning alerts.',
      image: '/images/overview/overview-banner.jpg',
    },
  ];
  const zimResearchCards = [
    {
      type: 'signal',
      title: 'June 2026 FEWS NET Outlook',
      metric: 'IPC Phase 2 now, with IPC Phase 3 expected in deficit areas from Oct 2026',
      detail:
        'FEWS NET says poor households can currently meet minimum food needs with recent harvest stocks, but deficit-producing areas in the south, east, west, and extreme north are expected to shift from Stressed (IPC Phase 2) to Crisis (IPC Phase 3) from around October through January 2027. Most Mashonaland surplus areas remain Minimal (IPC Phase 1).',
      action: 'Build working-capital buffers now and track the October stock-depletion window for target districts.',
      tag: 'FEWS NET Jun 2026',
    },
    {
      type: 'context',
      title: '2025/26 Harvest and Maize Prices',
      metric: '2.35M MT maize; 2.7M MT total cereals; 0.23-0.29 USD/kg in surplus areas',
      detail:
        'The 2026 CLAFA 2 estimates maize production at 2.35 million metric tons and total cereal production at around 2.7 million metric tons. FEWS NET says this has increased cereal availability and driven seasonal maize grain price declines in many areas, with surplus-zone prices around 0.23-0.29 USD/kg while deficit areas remain higher.',
      action: null,
      tag: 'FEWS NET Jun 2026',
    },
    {
      type: 'context',
      title: '2026 Tobacco Season',
      metric: '360-400M kg expected; sales volumes up 17% by early June',
      detail:
        'FEWS NET’s June 2026 outlook cites a record tobacco harvest forecast of 360 to 400 million kilograms. It also notes that TIMB reported a 17 percent increase in sales volumes compared with the same point last year, even as prices were around 25 percent lower.',
      action: 'Protect curing quality and watch mid-season price windows before moving volume.',
      tag: 'FEWS NET / TIMB Jun 2026',
    },
    {
      type: 'context',
      title: 'Income and Cost Pressure',
      metric: 'Transport fares 50-100% higher; poor-household incomes remain below average',
      detail:
        'FEWS NET says fuel and transport costs remain above average after the February energy shock, reducing disposable income. In deficit-producing areas, crop sales, casual labor, remittances, and petty trade are still below average, which is limiting household purchasing power even after the harvest.',
      action: null,
      tag: 'FEWS NET Jun 2026',
    },
    {
      type: 'context',
      title: 'Water and Livelihood Conditions',
      metric: 'About 91% dam levels as of 22 Jun 2026',
      detail:
        'FEWS NET reports that ZINWA recorded national dam levels at about 91 percent full on June 22, supporting winter irrigation and post-harvest horticulture. Above-average biomass is also raising veld fire risk across most provinces during the 2026 dry season.',
      action: null,
      tag: 'ZINWA / FEWS NET Jun 2026',
    },
    {
      type: 'action',
      title: 'Lean Season Outlook',
      metric: 'Poor-area stocks may deplete before Aug/Sep in the 2026/27 cycle',
      detail:
        'The outlook says the 2026/27 lean season could start earlier than usual in poor-production areas because stocks may run out two to four months after harvest. In surplus areas, own-produced food stocks are expected to last longer, but market reliance rises once household reserves fade.',
      action: 'Use the Market Clock and Seasonal Calendar tabs to line up sales, planting, and household cash needs.',
      tag: 'FEWS NET Jun 2026',
    },
  ];
  const researchSources = [
    { label: 'FEWS NET Zimbabwe Food Security Outlook (June 2026)', url: 'https://fews.net/southern-africa/zimbabwe/food-security-outlook/june-2026' },
    { label: 'FEWS NET Zimbabwe latest key message updates', url: 'https://fews.net/southern-africa/zimbabwe' },
    {
      label: 'FEWS NET Zimbabwe seasonal calendar',
      url: 'https://fews.net/southern-africa/zimbabwe/seasonal-calendar/july-2024',
    },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="overview" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zim-Agro Zimbabwe Farming Dashboard | Regions, Inputs, Market Timing"
        description="Data-rich farming guidance for Zimbabwe: natural regions, seed and fertilizer planning, seasonal market timing, crop calendars, and pest diagnostics."
        path={`${langSegment}/`}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="overview-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/overview/overview-banner.jpg')" }}
          />
          <h2>{t.nav.overview}</h2>
          <p>{t.opsCenterCopy}</p>

          <div className="overview-grid">
            {pageCards.map((card) => (
              <Link key={card.key} className="overview-link" to={pagePath(langCode, card.key)}>
                <div
                  className="overview-link-media"
                  aria-hidden="true"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </Link>
            ))}
          </div>
        </section>

         <section className="card print-surface">
           <h2>Zimbabwe Field Intelligence Snapshot</h2>
           <p>
             Updated planning signals grounded in current Zimbabwe food-security and market context. Use these to
             prioritize crop mix, cash flow timing, and risk buffers before each major season.
           </p>

           <div className="intel-signal">
             <div className="intel-signal-head">
               <span className="intel-badge intel-badge--signal">{zimResearchCards[0].tag}</span>
               <strong className="intel-signal-label">{zimResearchCards[0].title}</strong>
             </div>
             <h3>{zimResearchCards[0].metric}</h3>
             <p>{zimResearchCards[0].detail}</p>
             <p className="intel-action">
               <strong>→ Field Action:</strong> {zimResearchCards[0].action}
             </p>
           </div>

           <div className="intel-stats">
             <div className="intel-stat"><strong>2.35M MT</strong><span>2026 maize production estimate</span></div>
             <div className="intel-stat"><strong>91%</strong><span>National dam levels as of 22 Jun 2026</span></div>
             <div className="intel-stat"><strong>IPC 2 → 3</strong><span>Deficit areas from Oct 2026</span></div>
             <div className="intel-stat"><strong>360-400M kg</strong><span>2026 tobacco harvest forecast</span></div>
           </div>

           <div className="intel-grid">
             {zimResearchCards.slice(1).map((item) => (
               <article key={item.title} className={`intel-card intel-card--${item.type}`}>
                 <div className="intel-card-head">
                   <span className={`intel-badge intel-badge--${item.type}`}>{item.type.toUpperCase()}</span>
                   <span className="intel-source">{item.tag}</span>
                 </div>
                 <h3>{item.metric}</h3>
                 <p className="intel-eyebrow">{item.title}</p>
                 <p>{item.detail}</p>
                 {item.action && (
                   <p className="intel-action"><strong>→</strong> {item.action}</p>
                 )}
               </article>
             ))}
           </div>

           <div className="overview-sources">
            <h3>Sources</h3>
            <ul>
              {researchSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function MatrixPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const [activeRegion, setActiveRegion] = useState('II');
  const matrixSources = [
    {
      label: 'FEWS NET Zimbabwe Food Security Outlook (June 2026)',
      url: 'https://fews.net/southern-africa/zimbabwe/food-security-outlook/june-2026',
    },
    {
      label: 'Zimbabwe seasonal and livelihoods resources (FEWS NET)',
      url: 'https://fews.net/southern-africa/zimbabwe',
    },
    {
      label: 'Zimbabwe agriculture production context (FAOSTAT-linked summary)',
      url: 'https://en.wikipedia.org/wiki/Agriculture_in_Zimbabwe',
    },
  ];

  const selectedRegion = useMemo(
    () => regionData.find((region) => region.id === activeRegion) ?? regionData[1],
    [activeRegion]
  );

  return (
    <AppFrame langCode={langCode} currentPage="matrix" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zimbabwe Natural Regions Crop Matrix | Zim-Agro"
        description="Explore Zimbabwe's five natural farming regions with rainfall bands, crop fit, spacing, and agronomy planning notes."
        path={pagePath(langCode, 'matrix')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="matrix-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/matrix/matrix-banner.jpg')" }}
          />
          <h2>{t.matrixTitle}</h2>
          <p>{t.matrixLead}</p>

          <p className="region-select-hint">Select a region to see its full profile →</p>

          <div className="region-grid">
            {regionData.map((region) => (
              <button
                key={region.id}
                type="button"
                className={`region-tile ${activeRegion === region.id ? 'active' : ''}`}
                onClick={() => setActiveRegion(region.id)}
                style={{ '--tile-color': region.color }}
              >
                <div className="region-tile-photo" style={{ backgroundImage: `url('${region.image}')` }} />
                <span className="region-tile-label">{t.regionLabel}</span>
                <strong>{region.id}</strong>
                <span className="region-tile-name">
                  {regionDetails.find((d) => d.id === region.id)?.name}
                </span>
              </button>
            ))}
          </div>

          {(() => {
            const detail = regionDetails.find((d) => d.id === activeRegion);
            if (!detail) return null;
            return (
              <article className="region-detail-panel" aria-live="polite" style={{ '--panel-accent': selectedRegion.color }}>
                <div className="region-detail-header">
                  <div className="region-panel-media" style={{ backgroundImage: `url('${selectedRegion.image}')` }} />
                  <div className="region-detail-title">
                    <span className="region-detail-badge" style={{ background: selectedRegion.color }}>Region {detail.id}</span>
                    <h3>{detail.name}</h3>
                    <p className="region-detail-provinces">{detail.provinces}</p>
                  </div>
                </div>

                <div className="region-detail-grid">
                  <div className="region-detail-cell">
                    <span>Rainfall</span><strong>{detail.rainfall}</strong>
                  </div>
                  <div className="region-detail-cell">
                    <span>Planting Window</span><strong>{selectedRegion.planting}</strong>
                  </div>
                  <div className="region-detail-cell">
                    <span>Elevation</span><strong>{detail.elevation}</strong>
                  </div>
                  <div className="region-detail-cell">
                    <span>Typical Spacing</span><strong>{selectedRegion.spacing}</strong>
                  </div>
                  <div className="region-detail-cell">
                    <span>Soils</span><strong>{detail.soils}</strong>
                  </div>
                  <div className="region-detail-cell">
                    <span>Key Varieties</span><strong>{detail.varieties}</strong>
                  </div>
                </div>

                <div className="region-detail-crops">
                  <span>Headline Crops</span>
                  <div className="region-detail-crop-tags">
                    {selectedRegion.crops.map((c) => (
                      <span key={c} className="crop-tag" style={{ borderColor: selectedRegion.color }}>{c}</span>
                    ))}
                  </div>
                </div>

                <div className="region-detail-risk">
                  <strong>Primary Risk</strong>
                  <p>{detail.primaryRisk}</p>
                </div>

                <div className="region-detail-note">
                  <strong>Field Input Note</strong>
                  <p>{detail.inputNote}</p>
                </div>
              </article>
            );
          })()}

          <div className="intel-signal" style={{ marginTop: '1.2rem' }}>
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">FEWS NET Jun 2026</span>
              <strong className="intel-signal-label">2025/26 Season Signal</strong>
            </div>
            <h3>Early Rains → February Dry Spell → Localized Yield Pressure</h3>
            <p>
              Strong October–November 2025 rains gave early planters a good start. A dry spell from late January to
              mid-February cut moisture reserves in Region III–V areas. March recovery rains brought partial relief;
              final output is expected below the 5-year average in southern districts while Regions I and II hold up.
            </p>
            <p className="intel-action">
              <strong>→ Field Action:</strong> In Regions IV–V, lock in drought-tolerant varieties and confirm
              livestock grazing before the lean season peak.
            </p>
          </div>

          <div className="matrix-sources">
            <h3>Sources</h3>
            <ul>
              {matrixSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function CalculatorPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const [acreage, setAcreage] = useState(2);
  const [cropMode, setCropMode] = useState('maize');
  const acreagePresets = [1, 2, 5, 10];
  const modeConfig = {
    maize: { seed: 25, basal: 200, top: 150, seedPackSize: 10 },
    tobacco: { seed: 0.5, basal: 600, top: 300, seedPackSize: 1 },
    sorghum: { seed: 8, basal: 100, top: 75, seedPackSize: 5 },
  };
  const activeMode = modeConfig[cropMode] ?? modeConfig.maize;
  const cropModeLabels = {
    maize: t.estimator.maize,
    tobacco: t.estimator.tobacco,
    sorghum: t.estimator.sorghum,
  };
  const estimatorVisuals = [
    {
      key: 'acreage',
      title: t.acreage,
      image: '/images/estimator/estimator-acreage-input.webp',
    },
    {
      key: 'seed',
      title: t.seedNeed,
      image: '/images/estimator/estimator-seed-rate.jpg',
    },
    {
      key: 'basal',
      title: t.basalNeed,
      image: '/images/estimator/estimator-basal-fertilizer.jpg',
    },
    {
      key: 'top',
      title: t.topNeed,
      image: '/images/estimator/estimator-top-dressing.jpg',
    },
  ];

  const normalizedAcreage = Number.isFinite(acreage) ? Math.max(0, acreage) : 0;
  const seedKg = (normalizedAcreage * activeMode.seed).toFixed(1);
  const basalKg = (normalizedAcreage * activeMode.basal).toFixed(0);
  const topKg = (normalizedAcreage * activeMode.top).toFixed(0);
  const seedPacks = (normalizedAcreage * activeMode.seed / activeMode.seedPackSize).toFixed(1);
  const basalBags = Math.ceil((normalizedAcreage * activeMode.basal) / 50);
  const topBags = Math.ceil((normalizedAcreage * activeMode.top) / 50);
  const planBand = normalizedAcreage <= 2 ? 'starter' : normalizedAcreage <= 8 ? 'good' : 'warn';
  const cashPressure =
    normalizedAcreage <= 2
      ? t.estimator.noteCashStarter
      : normalizedAcreage <= 8
        ? t.estimator.noteCashGood
        : t.estimator.noteCashWarn;
  const confidenceImage =
    planBand === 'warn'
      ? '/images/estimator/estimator-confidence-warn.jpg'
      : '/images/estimator/estimator-confidence-good.jpg';

  const confidenceLabel =
    planBand === 'starter' ? t.estimator.starterScale : planBand === 'good' ? t.optimal : t.caution;
  const confidenceCopy =
    planBand === 'starter'
      ? t.estimator.starterCopy
      : planBand === 'good'
        ? t.estimator.goodCopy
        : t.estimator.warnCopy;

  const planningNotes = [
    {
      title: t.estimator.noteRateTitle,
      metric: `${t.seedNeed} ${activeMode.seed} ${t.estimator.unitKg}/${t.estimator.unitHectares} · ${t.basalNeed} ${activeMode.basal} ${t.estimator.unitKg}/${t.estimator.unitHectares} · ${t.topNeed} ${activeMode.top} ${t.estimator.unitKg}/${t.estimator.unitHectares}`,
      detail: t.estimator.noteRateDetail,
    },
    {
      title: t.estimator.noteProcTitle,
      metric: `${seedPacks} ${t.seedNeed} ${t.estimator.packs} · ${basalBags} ${t.basalNeed} ${t.estimator.bags} · ${topBags} ${t.topNeed} ${t.estimator.bags}`,
      detail: t.estimator.noteProcDetail,
    },
    {
      title: t.estimator.noteCashTitle,
      metric: planBand === 'warn' ? t.estimator.noteCashHigh : t.estimator.noteCashModerate,
      detail: cashPressure,
    },
    {
      title: t.estimator.notePracticeTitle,
      metric: t.estimator.notePracticeMetric,
      detail: t.estimator.notePracticeDetail,
    },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="calculator" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Seed and Fertilizer Estimator for Zimbabwe Farmers | Zim-Agro"
        description="Estimate seed, basal fertilizer, and top-dressing needs by acreage for maize, tobacco, and sorghum in Zimbabwe."
        path={pagePath(langCode, 'calculator')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="estimator-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/estimator/estimator-banner.webp')" }}
          />
          <h2>{t.calculatorTitle}</h2>
          <p>{t.calculatorLead}</p>

          <div className="calc-shell">
            <div className="calc-wrap">
              <div className="calc-inputs">
                <div className="crop-mode-switch no-print" role="group" aria-label={t.estimator.cropMode}>
                  <span>{t.estimator.cropMode}</span>
                  <div className="crop-mode-buttons">
                    {Object.keys(cropModeLabels).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        className={cropMode === mode ? 'active' : ''}
                        onClick={() => setCropMode(mode)}
                      >
                        {cropModeLabels[mode]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-input-head">
                  <label htmlFor="acreage-input">{t.acreage}</label>
                  <strong>{normalizedAcreage.toFixed(1)} {t.estimator.unitHectares}</strong>
                </div>

                <div className="acreage-presets no-print">
                  {acreagePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={normalizedAcreage === preset ? 'active' : ''}
                      onClick={() => setAcreage(preset)}
                    >
                      {preset} {t.estimator.unitHectares}
                    </button>
                  ))}
                </div>

                <input
                  id="acreage-input"
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={normalizedAcreage}
                  onChange={(event) => setAcreage(Number(event.target.value || 0))}
                  className="acreage-range no-print"
                />

                <input
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={normalizedAcreage}
                  onChange={(event) => setAcreage(Number(event.target.value || 0))}
                />
              </div>

              <div className="result-grid">
                <article className="result-card result-card--seed">
                  <span>{t.seedNeed}</span>
                  <strong>{seedKg} {t.estimator.unitKg}</strong>
                  <small>{seedPacks} x {activeMode.seedPackSize} {t.estimator.unitKg} {t.estimator.packs}</small>
                </article>
                <article className="result-card result-card--basal">
                  <span>{t.basalNeed}</span>
                  <strong>{basalKg} {t.estimator.unitKg}</strong>
                  <small>{basalBags} x 50 {t.estimator.unitKg} {t.estimator.bags}</small>
                </article>
                <article className="result-card result-card--top">
                  <span>{t.topNeed}</span>
                  <strong>{topKg} {t.estimator.unitKg}</strong>
                  <small>{topBags} x 50 {t.estimator.unitKg} {t.estimator.bags}</small>
                </article>
              </div>

              <div className="estimator-mini-stats">
                <div>
                  <span>{t.estimator.plantingUnit}</span>
                  <strong>{normalizedAcreage.toFixed(1)} {t.estimator.unitHectares} {cropModeLabels[cropMode]} {t.estimator.unitBlock}</strong>
                </div>
                <div>
                  <span>{t.estimator.procurementLoad}</span>
                  <strong>{seedPacks} {t.estimator.packs} + {basalBags + topBags} {t.estimator.unitFertilizerBags}</strong>
                </div>
                <div>
                  <span>{t.estimator.planningSignal}</span>
                  <strong>{cashPressure}</strong>
                </div>
              </div>

              <div className={`confidence ${planBand === 'warn' ? 'warn' : 'good'}`}>
                <strong>{t.confidence}:</strong> {confidenceLabel}
                <p>{confidenceCopy}</p>
              </div>
            </div>

            <aside className="estimator-sidecard">
              <div className="estimator-confidence-image" style={{ backgroundImage: `url('${confidenceImage}')` }} />
              <div className="estimator-sidecopy">
                <h3>{t.estimator.checklistTitle}</h3>
                <ul>
                  <li>{t.estimator.checklist1}</li>
                  <li>{t.estimator.checklist2}</li>
                  <li>{t.estimator.checklist3}</li>
                </ul>
              </div>
            </aside>
          </div>

          <div className="estimator-media-grid">
            {estimatorVisuals.map((item) => (
              <article key={item.key} className="estimator-media-card">
                <div className="estimator-media-photo" style={{ backgroundImage: `url('${item.image}')` }} />
                <p>{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card print-surface">
          <h2>{t.estimator.notesTitle}</h2>
          <p>{t.estimator.notesLead}</p>

          <div className="intel-stats estimator-intel-stats">
            <div className="intel-stat"><strong>{activeMode.seed} {t.estimator.unitKg}</strong><span>{t.estimator.statSeedRate}</span></div>
            <div className="intel-stat"><strong>{activeMode.basal} {t.estimator.unitKg}</strong><span>{t.estimator.statBasalRate}</span></div>
            <div className="intel-stat"><strong>{activeMode.top} {t.estimator.unitKg}</strong><span>{t.estimator.statTopRate}</span></div>
            <div className="intel-stat"><strong>0.5 {t.estimator.unitHectares}</strong><span>{t.estimator.statStep}</span></div>
          </div>

          <div className="intel-grid">
            {planningNotes.map((item) => (
              <article key={item.title} className="intel-card intel-card--context">
                <h3>{item.metric}</h3>
                <p className="intel-eyebrow">{item.title}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function MarketPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const tm = t.market;

  const dirIcons = { up: '▲', flat: '→', down: '▼' };
  const dirLabels = { up: tm.dirUp, flat: tm.dirFlat, down: tm.dirDown };

  const strategyCards = [
    { title: tm.card1Title, body: tm.card1Body, tag: tm.card1Tag, accent: 'forest' },
    { title: tm.card2Title, body: tm.card2Body, tag: tm.card2Tag, accent: 'amber' },
    { title: tm.card3Title, body: tm.card3Body, tag: tm.card3Tag, accent: 'rust' },
    { title: tm.card4Title, body: tm.card4Body, tag: tm.card4Tag, accent: 'graphite' },
  ];

  const intelNotes = [
    { title: tm.note1Title, body: tm.note1Body, tag: tm.note1Tag },
    { title: tm.note2Title, body: tm.note2Body, tag: tm.note2Tag },
    { title: tm.note3Title, body: tm.note3Body, tag: tm.note3Tag },
    { title: tm.note4Title, body: tm.note4Body, tag: tm.note4Tag },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="market" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zimbabwe Seasonal Market Clock | Crop Selling Windows"
        description="Use Zimbabwe market timing patterns to plan crop selling windows, avoid gluts, and improve farm pricing outcomes."
        path={pagePath(langCode, 'market')}
      />
      <main className="stack">

        {/* ── Section 1: Header + Signal + Commodity Cards ── */}
        <section className="card print-surface">
          <div
            className="market-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/market_clock/market-banner.jpg')" }}
          />
          <h2>{t.marketTitle}</h2>
          <p className="market-lead">{t.marketLead}</p>

          {/* Signal card */}
          <div className="market-signal">
            <div className="market-signal-label">{tm.signalLabel}</div>
            <div className="market-signal-crop">{tm.signalCrop}</div>
            <p className="market-signal-note">{tm.signalNote}</p>
          </div>

          {/* Commodity grid */}
          <div className="market-commodity-grid">
            {marketData.map((item) => (
              <article key={item.name} className={`market-commodity-card market-dir-${item.direction}`}>
                <div
                  className="market-commodity-photo"
                  aria-hidden="true"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="market-commodity-body">
                  <div className="market-commodity-head">
                    <h3>{item.name}</h3>
                    <span className={`market-dir-badge market-dir-badge--${item.direction}`}>
                      {dirIcons[item.direction]} {dirLabels[item.direction]}
                    </span>
                  </div>
                  <div className="market-commodity-meta">
                    <span><strong>{tm.peakLabel}:</strong> {item.peak}</span>
                    <span><strong>{tm.regionLabel}:</strong> {item.region}</span>
                  </div>
                  <div className="market-gauge-wrap">
                    <div className="market-gauge" style={{ '--gauge': `${item.indicator}%` }} />
                    <span className="market-gauge-label">{item.indicator}% {tm.indicatorLabel}</span>
                  </div>
                  <p className="market-commodity-hint"><strong>{t.sellHint}:</strong> {item.hint}</p>
                  <p className="market-commodity-strategy">{item.strategy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Section 2: Sell Window Strategy ── */}
        <section className="card print-surface">
          <h2>{tm.section2Title}</h2>
          <div className="market-strategy-grid">
            {strategyCards.map((card) => (
              <article key={card.title} className={`market-strategy-card market-strategy-card--${card.accent}`}>
                <div className="market-strategy-head">
                  <span className="market-strategy-tag">{card.tag}</span>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <div className="market-tips-grid">
            <article className="market-tip-card">
              <div
                className="market-tip-photo"
                aria-hidden="true"
                style={{ backgroundImage: "url('/images/market_clock/market-sell-window.jpg')" }}
              />
              <h3>Choosing Your Sell Window</h3>
              <p>
                Timing your sale to the price-temperature peak — typically 4–6 weeks after main harvest — captures
                the seasonal demand uplift before the market resets. Avoid selling during flush periods when supply from
                multiple producers compresses local prices.
              </p>
            </article>
            <article className="market-tip-card">
              <div
                className="market-tip-photo"
                aria-hidden="true"
                style={{ backgroundImage: "url('/images/market_clock/market-storage-tip.jpg')" }}
              />
              <h3>Storage as a Market Tool</h3>
              <p>
                Even basic ventilated storage that extends shelf life by 2–3 weeks can shift your sale into a better
                price window. Onions and maize benefit most; tomatoes require quicker turnover but staged release
                smooths income.
              </p>
            </article>
          </div>
        </section>

        {/* ── Section 3: Market Intelligence Notes ── */}
        <section className="card print-surface">
          <div className="intel-signal">
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">Market Intelligence</span>
              <h2 className="intel-signal-label">{tm.section3Title}</h2>
            </div>
            <p>{tm.section3Lead}</p>
          </div>
          <div className="intel-grid market-intel-grid">
            {intelNotes.map((note) => (
              <article key={note.title} className="intel-card intel-card--context">
                <div className="intel-card-head">
                  <span className="intel-eyebrow">{note.tag}</span>
                  <h3>{note.title}</h3>
                </div>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </section>

      </main>
    </AppFrame>
  );
}

function SeasonalPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const seasonalPulse = [
    {
      title: 'Land Prep Window',
      window: 'Sep-Nov',
      detail: 'Repair contours, rip planting lines, and secure basal fertilizer before first effective rainfall.',
      tone: 'soil',
    },
    {
      title: 'Main Planting Push',
      window: 'Nov-Jan',
      detail: 'Plant within 7-10 days of effective rain to protect yield potential and avoid late-season moisture stress.',
      tone: 'mint',
    },
    {
      title: 'Critical Weeding Phase',
      window: 'Jan-Mar',
      detail: 'First and second weeding drives final yield. Labour shortages in this phase cost more than input delays.',
      tone: 'forest',
    },
    {
      title: 'Harvest + Cash Window',
      window: 'Apr-Jul',
      detail: 'Sequence harvest, drying, grading, and market release. Avoid distressed sales during high-supply weeks.',
      tone: 'graphite',
    },
  ];

  const seasonalRiskWindows = [
    'Dry spell risk: late Jan-mid Feb',
    'Armyworm scouting: Dec-Mar',
    'Post-harvest loss risk: Apr-Jun',
    'Lean-season cash stress: Feb-Apr',
  ];

  const seasonalPlaybook = [
    {
      title: 'Pre-Rain Readiness',
      metric: 'Inputs secured before 1st effective rain',
      detail:
        'Buy seed, basal fertilizer, and pesticides before rainfall starts. Waiting for rain to begin procurement shortens planting windows and increases costs.',
    },
    {
      title: 'Planting Discipline',
      metric: 'Plant within first 10 days',
      detail:
        'In Zimbabwe systems, delayed planting compounds pest pressure and shifts grain filling into higher moisture-risk periods. Keep land prep complete before October close.',
    },
    {
      title: 'Labour Management',
      metric: 'Labour peaks in Jan-Mar',
      detail:
        'Weeding, top-dressing, and pest control overlap. Book labour early or stagger field blocks so critical tasks are not missed in a single week.',
    },
    {
      title: 'Winter Wheat Planning',
      metric: 'Planting window: May-Jul',
      detail:
        'Where irrigation exists, winter wheat stabilizes annual cash flow and spreads risk away from one rain-fed summer harvest cycle.',
    },
    {
      title: 'Storage and Drying',
      metric: 'Moisture control protects margins',
      detail:
        'Dry grain and legumes before bulk storage. Poor moisture control converts a strong harvest into forced low-price sales within weeks.',
    },
    {
      title: 'Lean Season Buffer',
      metric: 'Cash and food reserves by January',
      detail:
        'Set aside household food stock and a cash reserve ahead of February-April. This prevents panic sales of productive assets in lean months.',
    },
  ];

  const seasonalVisuals = [
    {
      key: 'land-prep',
      title: 'Land Preparation',
      image: '/images/seasonal/seasonal-land-prep.jpg',
    },
    {
      key: 'planting',
      title: 'Planting Window',
      image: '/images/seasonal/seasonal-planting.jpg',
    },
    {
      key: 'weeding',
      title: 'Weeding Phase',
      image: '/images/seasonal/seasonal-weeding.jpg',
    },
    {
      key: 'harvest',
      title: 'Main Harvest',
      image: '/images/seasonal/seasonal-harvest.jpg',
    },
    {
      key: 'winter-wheat',
      title: 'Winter Wheat Cycle',
      image: '/images/seasonal/seasonal-winter-wheat.jpg',
    },
    {
      key: 'lean',
      title: 'Lean Season Pressure',
      image: '/images/seasonal/seasonal-lean-season.jpg',
    },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="seasonal" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zimbabwe Farming Seasonal Calendar | Planting to Harvest"
        description="Month-by-month seasonal farming calendar for Zimbabwe covering land preparation, planting, weeding, harvest, and lean-season planning."
        path={pagePath(langCode, 'seasonal')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="seasonal-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/seasonal/seasonal-banner.jpg')" }}
          />
          <h2>{t.seasonalTitle}</h2>
          <p>{t.seasonalLead}</p>

          <div className="seasonal-pulse-grid">
            {seasonalPulse.map((item) => (
              <article key={item.title} className={`seasonal-pulse-card seasonal-pulse-card--${item.tone}`}>
                <span className="seasonal-pulse-window">{item.window}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="seasonal-risk-strip">
            {seasonalRiskWindows.map((risk) => (
              <span key={risk}>{risk}</span>
            ))}
          </div>

          <div className="seasonal-shell">
            <div className="season-tag rainy" style={{ '--start': 11, '--end': 12 }}>
              {t.rainySeason}
            </div>
            <div className="season-tag lean" style={{ '--start': 11, '--end': 2 }}>
              {t.leanSeason}
            </div>

            <div className="timeline-months">
              {monthLabels.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <div className="timeline-grid">
              {seasonalTimeline.map((row) => (
                <div key={row.activity} className="timeline-row">
                  <p>{row.activity}</p>
                  <div className="timeline-track">
                    {row.windows.map(([start, end], index) => (
                      <span
                        key={`${row.activity}-${index}`}
                        className={`timeline-bar ${row.tone}`}
                        style={{ gridColumn: `${start} / ${end + 1}` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="seasonal-media-grid">
            {seasonalVisuals.map((item) => (
              <article key={item.key} className="seasonal-media-card">
                <div className="seasonal-media-photo" style={{ backgroundImage: `url('${item.image}')` }} />
                <p>{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card print-surface">
          <h2>Seasonal Decision Playbook</h2>
          <p>
            Use this playbook with the monthly timeline above. The objective is to protect yield during rain-fed phases,
            then preserve value during harvest and post-harvest handling.
          </p>

          <div className="intel-signal">
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">Critical Window</span>
              <strong className="intel-signal-label">January to March decides most outcomes</strong>
            </div>
            <p>
              This period combines weeding, top-dressing, and peak pest pressure. Missed operations in this window are
              difficult to recover later, even in above-average rainfall seasons.
            </p>
            <p className="intel-action"><strong>→ Field Action:</strong> Lock labour plans and top-dressing logistics before end of December.</p>
          </div>

          <div className="seasonal-playbook-grid">
            {seasonalPlaybook.map((item) => (
              <article key={item.title} className="seasonal-playbook-card">
                <h3>{item.metric}</h3>
                <p className="intel-eyebrow">{item.title}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function VegetablesPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const vegetablesPulse = [
    {
      title: 'Nursery and Bed Prep',
      window: 'Aug-Oct',
      detail: 'Prepare nurseries, sterilize seedling media, and line up irrigation schedules before transplanting starts.',
      tone: 'mint',
    },
    {
      title: 'Transplanting Peak',
      window: 'Sep-Nov',
      detail: 'Stagger transplanting by 2-3 week intervals to smooth harvest supply and avoid single-window market gluts.',
      tone: 'soil',
    },
    {
      title: 'Pest Pressure Window',
      window: 'Nov-Feb',
      detail: 'Warm-season pest pressure climbs quickly. Tight scouting intervals and sanitation reduce emergency spray costs.',
      tone: 'forest',
    },
    {
      title: 'Cool-Season Margin Window',
      window: 'May-Aug',
      detail: 'Leafy and brassica crops often command steadier prices in cool months when heat-stressed supply drops.',
      tone: 'graphite',
    },
  ];

  const vegetablesPlaybook = [
    {
      title: 'Staggered Planting',
      metric: 'Plant every 2-3 weeks',
      detail:
        'Avoid sending all produce to market in one week. Staggering reduces price shocks and gives you multiple sales opportunities.',
    },
    {
      title: 'Irrigation Priority',
      metric: 'Protect seedlings first',
      detail:
        'In dry spells, prioritize seedling and recently transplanted blocks. Older plots recover better than young ones.',
    },
    {
      title: 'Harvest and Grading',
      metric: 'Grade before transport',
      detail:
        'Separating produce by size and quality before loading can increase realized price and reduce rejected volume at market.',
    },
    {
      title: 'Soil Fertility Rhythm',
      metric: 'Split nutrient applications',
      detail:
        'Frequent light top-dressing and organic matter additions outperform one heavy application for most vegetable blocks.',
    },
    {
      title: 'Labour Scheduling',
      metric: 'Align labour with transplant and harvest spikes',
      detail:
        'Vegetable systems are labour-intensive. Confirm labour plans before transplant windows and pre-market harvest days.',
    },
    {
      title: 'Market Channel Mix',
      metric: 'Wholesale + direct sales',
      detail:
        'Splitting volume across channels improves resilience when one buyer segment weakens unexpectedly.',
    },
  ];

  const monthlyIntensity = monthLabels.map((month, index) => {
    const monthNumber = index + 1;
    const cropCount = vegetableCalendar.filter((row) => row.months.includes(monthNumber)).length;
    return { month, cropCount };
  });

  const maxMonthlyLoad = Math.max(...monthlyIntensity.map((item) => item.cropCount), 1);

  const vegetableVisuals = [
    {
      key: 'cool-season',
      title: 'Cool Season Crop Systems',
      image: '/images/vegetables/egetables-cool-season.jpg',
    },
    {
      key: 'warm-season',
      title: 'Warm Season Crop Systems',
      image: '/images/vegetables/vegetables-warm-season.jpg',
    },
    {
      key: 'seedlings',
      title: 'Seedling Stage Management',
      image: '/images/vegetables/vegetables-seedling-stage.jpg',
    },
    {
      key: 'transplanting',
      title: 'Transplanting and Bed Setup',
      image: '/images/vegetables/vegetables-transplanting.jpg',
    },
    {
      key: 'market-ready',
      title: 'Market-Ready Grading',
      image: '/images/vegetables/vegetables-market-ready.jpg',
    },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="vegetables" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zimbabwe Vegetables Planting Calendar | Zim-Agro"
        description="Vegetable planting calendar and decision playbook for Zimbabwe farmers, including crop-month windows and production timing guidance."
        path={pagePath(langCode, 'vegetables')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="vegetables-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/vegetables/vegetables-banner.jpg')" }}
          />
          <h2>{t.vegetablesTitle}</h2>
          <p>{t.vegetablesLead}</p>

          <div className="vegetables-pulse-grid">
            {vegetablesPulse.map((item) => (
              <article key={item.title} className={`vegetables-pulse-card vegetables-pulse-card--${item.tone}`}>
                <span className="vegetables-pulse-window">{item.window}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="vegetables-intensity-strip">
            {monthlyIntensity.map((item) => (
              <article key={item.month} className="vegetables-intensity-chip">
                <span>{item.month}</span>
                <div className="vegetables-intensity-bar">
                  <i style={{ width: `${(item.cropCount / maxMonthlyLoad) * 100}%` }} />
                </div>
                <strong>{item.cropCount} crops</strong>
              </article>
            ))}
          </div>

          <div className="vegetables-media-grid">
            {vegetableVisuals.map((item) => (
              <article key={item.key} className="vegetables-media-card">
                <div className="vegetables-media-photo" style={{ backgroundImage: `url('${item.image}')` }} />
                <p>{item.title}</p>
              </article>
            ))}
          </div>

          <div className="veg-wrap">
            <table className="veg-table">
              <thead>
                <tr>
                  <th>{t.crop}</th>
                  {monthLabels.map((month) => (
                    <th key={month}>{month.slice(0, 3)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vegetableCalendar.map((row) => (
                  <tr key={row.crop}>
                    <th>{row.crop}</th>
                    {monthLabels.map((_, index) => {
                      const monthNumber = index + 1;
                      const active = row.months.includes(monthNumber);
                      return <td key={`${row.crop}-${monthNumber}`} className={active ? 'active' : ''} />;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card print-surface">
          <h2>Vegetables Decision Playbook</h2>
          <p>
            Combine the crop-month matrix above with this playbook to sequence production, labour, and market release
            for steadier weekly cash flow.
          </p>

          <div className="intel-signal">
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">High-Value Window</span>
              <strong className="intel-signal-label">Cool-season quality premiums are easiest to capture</strong>
            </div>
            <p>
              May to August often gives cleaner quality output for leafy greens, cabbage, and carrots when pest pressure
              is lower and post-harvest losses are easier to manage.
            </p>
            <p className="intel-action"><strong>→ Field Action:</strong> Build your nursery pipeline in late winter so transplant blocks hit market at the start of cool-season demand.</p>
          </div>

          <div className="vegetables-playbook-grid">
            {vegetablesPlaybook.map((item) => (
              <article key={item.title} className="vegetables-playbook-card">
                <h3>{item.metric}</h3>
                <p className="intel-eyebrow">{item.title}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function PestsPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const pestSeverityBands = [
    {
      level: 'Low Pressure',
      trigger: '1-2 hotspots / block',
      action: 'Increase scouting frequency, remove infected plants, and deploy local organic controls before escalation.',
      tone: 'mint',
    },
    {
      level: 'Moderate Pressure',
      trigger: '3-5 hotspots / block',
      action: 'Apply targeted intervention by pest stage and rotate control methods. Confirm field hygiene every 48 hours.',
      tone: 'amber',
    },
    {
      level: 'High Pressure',
      trigger: '>5 hotspots / block',
      action: 'Treat as outbreak: isolate affected zones, calibrate sprays immediately, and activate full PPE protocol.',
      tone: 'rust',
    },
  ];

  const interventionPlaybook = [
    {
      title: 'Scouting Cadence',
      metric: '2-3 times per week',
      detail:
        'Run consistent scouting routes across all blocks and log symptoms by location. Comparing week-over-week spread is more useful than single-day counts.',
    },
    {
      title: 'Threshold Discipline',
      metric: 'Treat by pest stage, not panic',
      detail:
        'Intervene once threshold conditions are met. Early larval stages respond better and cost less to manage than late-stage outbreaks.',
    },
    {
      title: 'Spray Accuracy',
      metric: 'Calibrate before every cycle',
      detail:
        'Most field failures are from poor calibration, wrong droplet size, or poor coverage. Calibration errors waste product and can accelerate resistance.',
    },
    {
      title: 'Resistance Management',
      metric: 'Rotate modes of action',
      detail:
        'Avoid repeated use of one chemistry group across consecutive cycles. Rotation preserves efficacy and slows resistance pressure.',
    },
    {
      title: 'Sanitation Loop',
      metric: 'Remove hosts after control',
      detail:
        'After treatment, remove infested residues and volunteer plants. Without sanitation, re-infestation pressure usually rebounds in 7-10 days.',
    },
    {
      title: 'Safety Baseline',
      metric: 'PPE is non-negotiable',
      detail:
        'Protect labour health with full PPE, safe mixing zones, and post-application wash protocols. Unsafe handling turns control wins into human risk.',
    },
  ];

  const pestRiskSignals = [
    'Peak scouting load: Dec-Mar',
    'Armyworm alert: early vegetative maize',
    'Leaf disease watch: humid canopies',
    'Reinfestation risk: 7-10 days post-spray',
  ];

  const pestWorkflow = [
    {
      key: 'diagnostic-workflow',
      title: 'Diagnostic Workflow',
      image: '/images/pests_gallery/pest-diagnostic-workflow.jpg',
      copy: 'Start with consistent scouting routes, compare hot spots by block, and log symptom progression before deciding control options.',
    },
    {
      key: 'threshold-check',
      title: 'Threshold Check',
      image: '/images/pests_gallery/pest-threshold-check.jpg',
      copy: 'Use visible damage counts and pest stage checks to avoid unnecessary sprays and to time interventions more effectively.',
    },
    {
      key: 'disease-symptom',
      title: 'Leaf Symptom Recognition',
      image: '/images/pests_gallery/disease-symptom-leaf.jpg',
      copy: 'Distinguish nutrient stress from disease signs by pattern, lesion texture, and spread behavior across the canopy.',
    },
    {
      key: 'spray-safety',
      title: 'Spray Safety and PPE',
      image: '/images/pests_gallery/spray-safety-kit.jpg',
      copy: 'Treat PPE and calibration as non-negotiable: safe handling protects labor health and prevents misapplication losses.',
    },
    {
      key: 'organic-remedy',
      title: 'Local Organic Remedies',
      image: '/images/pests_gallery/organic-remedy-prep.jpg',
      copy: 'Prepared local remedies can support integrated control where pressure is still low to moderate and frequent monitoring is maintained.',
    },
    {
      key: 'field-sanitation',
      title: 'Field Sanitation',
      image: '/images/pests_gallery/field-sanitation.jpg',
      copy: 'Removing infected plant material and volunteer hosts reduces reinfestation pressure between cycles.',
    },
  ];

  return (
    <AppFrame langCode={langCode} currentPage="pests" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Zimbabwe Crop Pest and Disease Guide | Zim-Agro"
        description="Visual pest and disease diagnostics with practical field intervention steps and remedy references for Zimbabwe agriculture."
        path={pagePath(langCode, 'pests')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div
            className="pests-banner"
            aria-hidden="true"
            style={{ backgroundImage: "url('/images/pests_gallery/pest-gallery-banner.jpg')" }}
          />
          <h2>{t.pestsTitle}</h2>
          <p>{t.pestsLead}</p>

          <div className="pests-risk-strip">
            {pestRiskSignals.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="pest-severity-grid">
            {pestSeverityBands.map((band) => (
              <article key={band.level} className={`pest-severity-card pest-severity-card--${band.tone}`}>
                <span className="pest-severity-trigger">{band.trigger}</span>
                <h3>{band.level}</h3>
                <p>{band.action}</p>
              </article>
            ))}
          </div>

          <div className="pests-workflow-grid">
            {pestWorkflow.map((item) => (
              <article key={item.key} className="pests-workflow-card">
                <div className="pests-workflow-photo" style={{ backgroundImage: `url('${item.image}')` }} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="pest-grid">
            {Object.entries(remedyData).map(([slug, item]) => (
              <Link key={slug} className="pest-card" to={remedyPath(langCode, slug)}>
                <div className={`pest-image ${slug}`} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.short}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="card print-surface">
          <h2>Pest Intervention Playbook</h2>
          <p>
            Use this playbook to sequence scouting, threshold checks, and intervention timing so action is faster,
            safer, and more cost-effective in high-pressure weeks.
          </p>

          <div className="intel-signal">
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">Critical Window</span>
              <strong className="intel-signal-label">The first 72 hours after detection matter most</strong>
            </div>
            <p>
              Once threshold is crossed, response delays allow rapid population growth and canopy spread. Early, precise,
              and stage-appropriate action is usually cheaper than late broad interventions.
            </p>
            <p className="intel-action"><strong>→ Field Action:</strong> Trigger a same-day scouting review and treatment plan when new hotspot clusters appear.</p>
          </div>

          <div className="pests-playbook-grid">
            {interventionPlaybook.map((item) => (
              <article key={item.title} className="pests-playbook-card">
                <h3>{item.metric}</h3>
                <p className="intel-eyebrow">{item.title}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function ContactPage({ langCode, lowData, setLowData }) {
  const supportTopics = [
    {
      title: 'Request an Information Update',
      detail:
        'Need fresh data in a section? Email the exact page name, the information that looks outdated, the district or region it applies to, and the season/year you are planning for.',
    },
    {
      title: 'Ask for Region-Specific Guidance',
      detail:
        'Share your Natural Region, main crops, land size, and your current challenge. We can prioritize practical updates that match your production conditions.',
    },
    {
      title: 'Report Accuracy or Usability Issues',
      detail:
        'If you spot inconsistencies or unclear advice, send a screenshot plus a short explanation of what should be corrected. Your feedback helps improve field reliability for all users.',
    },
  ];

  const requestChecklist = [
    'Your district, ward, and Natural Region (I-V).',
    'Crop or livestock system affected by the update.',
    'The specific section needing revision (Matrix, Estimator, Market Clock, Seasonal, Vegetables, or Pests).',
    'The exact information you want updated and why it matters for your planning decisions.',
    'Any supporting source links, extension notes, or market observations you want reviewed.',
    'Urgency level and the deadline you are working toward.',
  ];

  return (
    <AppFrame langCode={langCode} currentPage="contact" lowData={lowData} setLowData={setLowData}>
      <PageSeo
        title="Contact Zim-Agro | Zimbabwe Agriculture Platform"
        description="Contact Zim-Agro for agriculture content updates, corrections, and support requests for Zimbabwe farming information."
        path={pagePath(langCode, 'contact')}
      />
      <main className="stack">
        <section className="card print-surface">
          <div className="contact-banner" aria-hidden="true" />
          <h2>Contact Us</h2>
          <p>
            Reach out when you need a content update, clarification, or help applying platform guidance to your farm
            planning workflow. Detailed requests help us respond faster and with more useful recommendations.
          </p>

          <div className="contact-grid">
            {supportTopics.map((topic) => (
              <article key={topic.title} className="contact-topic-card">
                <h3>{topic.title}</h3>
                <p>{topic.detail}</p>
              </article>
            ))}
          </div>

          <article className="contact-direct-card">
            <h3>Primary Contact Channel</h3>
            <p>
              Email: <a href="mailto:lincolnrwodzi418@gmail.com">lincolnrwodzi418@gmail.com</a>
            </p>
            <p>
              For update requests, use the subject line <strong>"Zim-Agro Update Request - [Section Name]"</strong>
              so your request can be routed quickly.
            </p>
            <p>
              Typical response guidance: acknowledgement within 1-2 business days, with priority to high-impact
              seasonal updates and urgent field-risk corrections.
            </p>
          </article>
        </section>

        <section className="card print-surface">
          <h2>How to Request a Specific Update</h2>
          <p>
            If you are requesting an update on particular information, include the checklist below so the team can
            assess, validate, and publish improvements without unnecessary back-and-forth.
          </p>

          <ul className="contact-checklist">
            {requestChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="intel-signal">
            <div className="intel-signal-head">
              <span className="intel-badge intel-badge--signal">Submission Tip</span>
              <strong className="intel-signal-label">High-quality requests are processed faster</strong>
            </div>
            <p>
              Requests that include region context, source evidence, and a clear planning impact are easier to verify
              and are more likely to be released in the next update cycle.
            </p>
          </div>
        </section>

        <section className="card print-surface">
          
        </section>
      </main>
    </AppFrame>
  );
}

function RemedyPage({ langCode, lowData, setLowData }) {
  const t = languages[langCode];
  const params = useParams();
  const slug = params.slug ?? '';
  const item = remedyData[slug];
  const backPath = pagePath(langCode, 'overview');
  const remedyTitle = item ? `${item.title} Remedy Guide | Zim-Agro` : 'Pest Remedy Guide | Zim-Agro';
  const remedyDescription = item
    ? `${item.title} management guidance for Zimbabwe farmers, including organic/local options and chemical control notes.`
    : 'Practical remedy guidance for crop pest and disease management in Zimbabwe.';

  return (
    <AppFrame langCode={langCode} currentPage="pests" lowData={lowData} setLowData={setLowData}>
      <PageSeo title={remedyTitle} description={remedyDescription} path={remedyPath(langCode, slug)} />
      <main className="stack">
        <section className="card print-surface">
          {item ? (
            <>
              <p className="eyebrow">{t.remedyTitle}</p>
              <h2>{item.title}</h2>
              <p>{item.short}</p>
              <article className="remedy-box">
                <h3>{t.organic}</h3>
                <p>{item.organic}</p>
              </article>
              <article className="remedy-box">
                <h3>{t.chemical}</h3>
                <p>{item.chemical}</p>
              </article>
            </>
          ) : (
            <p>{t.notFound}</p>
          )}
          <Link className="back-link" to={backPath}>
            {t.backHome}
          </Link>
        </section>
      </main>
    </AppFrame>
  );
}

function RoutedApp() {
  const [lowData, setLowData] = useState(false);
  const routeConfigs = Object.keys(languages).flatMap((langCode) => [
    {
      path: pagePath(langCode, 'overview'),
      element: <OverviewPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'matrix'),
      element: <MatrixPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'calculator'),
      element: <CalculatorPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'market'),
      element: <MarketPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'seasonal'),
      element: <SeasonalPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'vegetables'),
      element: <VegetablesPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'pests'),
      element: <PestsPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: pagePath(langCode, 'contact'),
      element: <ContactPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
    {
      path: remedyPath(langCode, ':slug'),
      element: <RemedyPage langCode={langCode} lowData={lowData} setLowData={setLowData} />,
    },
  ]);

  return (
    <Routes>
      {routeConfigs.map((routeConfig) => (
        <Route key={routeConfig.path} path={routeConfig.path} element={routeConfig.element} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default RoutedApp;
