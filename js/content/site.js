// All visible text lives here as {hi, en}. Pages only render it (via textContent).
const LH = "https://www.livehindustan.com/bihar/muzaffarpur/";

export const NAV = [
  { page: "home", href: "index.html", label: { hi: "मुख्य", en: "Home" } },
  { page: "about", href: "about.html", label: { hi: "परिचय", en: "About" } },
  { page: "issues", href: "issues.html", label: { hi: "संघर्ष और मुद्दे", en: "Struggle & Issues" } },
  { page: "journey", href: "journey.html", label: { hi: "सफर", en: "Journey" } },
  { page: "proof", href: "proof.html", label: { hi: "प्रमाण", en: "Proof" } },
  { page: "vision", href: "vision.html", label: { hi: "विजन", en: "Vision" } },
  { page: "connect", href: "connect.html", label: { hi: "जुड़ें", en: "Connect" } },
];

export const FOOTER = {
  contact: { hi: "संपर्क: मो. 8797858081 · ईमेल bjp95kanti@gmail.com · काँटी पुराना चौक, काँटी, मुजफ्फरपुर",
             en: "Contact: 8797858081 · bjp95kanti@gmail.com · Kanti Purana Chowk, Kanti, Muzaffarpur" },
  publisher: { hi: "प्रकाशक/मुद्रक का विवरण यहाँ जोड़ें: __________", en: "Add publisher / printer details here: __________" },
};

// Proof registry. Empty url => the item that needs it stays hidden.
export const SOURCES = {
  office: { url: LH + "story-new-bjp-officials-announced-in-muzaffarpur-west-district-201741801811792.html", label: { hi: "समाचार देखें", en: "View news" } },
  namo:   { url: LH + "story-samrat-becomes-regional-in-charge-of-namo-app-9238626.html", label: { hi: "समाचार देखें", en: "View news" } },
  tax:    { url: LH + "story-the-movement-will-continue-until-the-decision-on-wrong-holding-tax-is-withdrawn-9230173.amp.html", label: { hi: "समाचार देखें", en: "View news" } },
  nuljal: { url: LH + "story-fix-the-problem-of-tap-water-bjp-5541795.amp.html", label: { hi: "समाचार देखें", en: "View news" } },
  court:  { url: "https://indiankanoon.org/doc/197528177/", label: { hi: "निर्णय-पाठ", en: "Judgment text" } },
  court2: { url: "https://courtmesh.ai/judgment/patna-high-court/2025/cwjc-19522-2024-of-samrat-kumar-samart-kumar-gupta-vs-the-state-of-2025-5a6920", label: { hi: "दूसरा रिकॉर्ड", en: "Second record" } },
  flood:  { url: "", label: { hi: "प्रमाण देखें", en: "View proof" } },
  poverty:{ url: "", label: { hi: "प्रमाण देखें", en: "View proof" } },
};

export const HOME = {
  title: { hi: "मैं सम्राट कुमार गुप्ता हूँ।", en: "I am Samrat Kumar Gupta." },
  post: { hi: "मुख्य पार्षद (सभापति) पद का प्रत्याशी · नगर परिषद काँटी, मुजफ्फरपुर", en: "Candidate for Chief Councillor (Sabhapati) · Nagar Parishad Kanti, Muzaffarpur" },
  quote: { hi: "“मेरे लिए राजनीति केवल पद प्राप्त करने का माध्यम नहीं, बल्कि समाज के बीच रहकर लोगों की समस्याओं को समझने, उनकी आवाज़ बनने और समाधान के लिए निरंतर प्रयास करने का संकल्प है।”",
           en: "“For me, politics is not a way to gain office. It is a commitment to live among the people, understand their problems, be their voice and keep working towards solutions.”" },
  ctaConnect: { hi: "सीधे मुझसे जुड़ें", en: "Connect with me directly" },
  ctaProof: { hi: "मेरे कार्यों के प्रमाण", en: "Proof of my work" },
  motto: { hi: ["व्यक्ति नहीं, विचार महत्वपूर्ण है।", "पद नहीं, जनसेवा मेरा उद्देश्य है।"], en: ["The idea matters, not the individual.", "My aim is public service, not office."] },
  journey: { hi: "संघर्ष से संगठन तक, पत्रकारिता से जनहित तक और जनहित से जनसेवा तक — यही मेरी सार्वजनिक जीवन की यात्रा है।",
             en: "From struggle to organisation, from journalism to public interest, and from public interest to public service — this is my journey in public life." },
  photoAlt: { hi: "सम्राट कुमार गुप्ता", en: "Samrat Kumar Gupta" },
};

export const ABOUT = {
  title: { hi: "मैं कौन हूँ?", en: "Who am I?" },
  facts: [
    { big: "1995", text: { hi: "से भाजपा के लिए समर्पित", en: "dedicated to the party since" } },
    { big: "2000–2017", text: { hi: "पत्रकारिता: दैनिक जागरण, हिन्दुस्तान, प्रभात खबर, ज़ी न्यूज़", en: "journalism: Dainik Jagran, Hindustan, Prabhat Khabar, Zee News" } },
    { big: { hi: "वार्ड 01", en: "Ward 01" }, text: { hi: "काँटी पुराना चौक, नगर परिषद काँटी का निवासी", en: "resident of Kanti Purana Chowk, Nagar Parishad Kanti" } },
  ],
  bio: { hi: "शिक्षा: एल.एल.बी. (द्वितीय वर्ष तक), एनसीसी, कम्प्यूटर, पत्रकारिता। सर्व शिक्षा अभियान के तहत शिक्षा के क्षेत्र में जिले में विशिष्ट सम्मान से पुरस्कृत। वर्तमान में जिला महामंत्री सह मुख्यालय प्रभारी, भाजपा मुजफ्फरपुर पश्चिमी।",
         en: "Education: LL.B. (up to second year), NCC, computers, journalism. Honoured at district level for work in education under the Sarva Shiksha Abhiyan. Currently District General Secretary & Headquarters In-charge, BJP Muzaffarpur West." },
  ideologyTitle: { hi: "मेरी विचारधारा", en: "My ideology" },
  ideology: [
    { head: { hi: "राष्ट्रसेवा", en: "Service to the nation" }, text: { hi: "आत्मनिर्भर भारत और स्वदेशी के संकल्प को गली-मोहल्ले तक पहुँचाना।", en: "taking the resolve of Atmanirbhar Bharat and Swadeshi down to every lane and neighbourhood." } },
    { head: { hi: "संगठन", en: "Organisation" }, text: { hi: "मज़बूत संगठन ही जनता की बात सही जगह पहुँचाता है। मैंने बूथ से मंडल तक संगठन खड़ा करने का काम किया है।", en: "a strong organisation carries people’s concerns to the right place. I have worked on building it from booth to mandal level." } },
    { head: { hi: "सामाजिक उत्तरदायित्व", en: "Social responsibility" }, text: { hi: "जो सुविधा जनता के कर से चलती है, उसका हिसाब जनता को मिलना चाहिए।", en: "whatever runs on the public’s taxes must be accounted for to the public." } },
  ],
};

export const ISSUES = {
  struggleTitle: { hi: "मेरा संघर्ष: पत्रकारिता से जनहित तक", en: "My struggle: from journalism to public interest" },
  struggle: [
    { text: { hi: "वर्ष 2000 से 2017 तक देश के प्रमुख समाचार पत्रों और चैनल के माध्यम से जनता की आवाज़ बनकर परिवर्तन का भागीदार रहा।", en: "From 2000 to 2017, I worked through leading newspapers and a news channel as a voice of the people and a partner in change." } },
    { head: { hi: "बाढ़ राहत", en: "Flood relief" }, text: { hi: "2007–08 में काँटी क्षेत्र में बाढ़-राहत वितरण की अनियमितताओं पर रिपोर्टिंग।", en: "reported on irregularities in flood-relief distribution in the Kanti area in 2007–08." }, proof: ["flood"], needsProof: true },
    { head: { hi: "गरीबी और जवाबदेही", en: "Poverty and accountability" }, text: { hi: "ग्रामीण मुजफ्फरपुर में गरीबी, बीपीएल परिवारों और प्रशासनिक जवाबदेही के मुद्दों पर रिपोर्टिंग।", en: "reported on poverty, BPL families and administrative accountability in rural Muzaffarpur." }, proof: ["poverty"], needsProof: true },
  ],
  issuesTitle: { hi: "जनता के मुद्दे", en: "People’s issues" },
  issues: [
    { head: { hi: "होल्डिंग टैक्स", en: "Holding tax" }, text: { hi: "काँटी नगर परिषद की होल्डिंग टैक्स वसूली की वैधता पर सवाल उठाए। जनवरी 2024 में नागरिक अधिकार मंच की बैठक और आंदोलन की खबर छपी, और मामला पटना उच्च न्यायालय तक ले गया (CWJC 19522/2024, निर्णय 10 जनवरी 2025)।", en: "questioned the legality of holding-tax collection by Nagar Parishad Kanti. A January 2024 news report covers the Nagrik Adhikar Manch meeting and agitation, and I took the matter to the Patna High Court (CWJC 19522/2024, decided 10 January 2025)." }, proof: ["tax", "court"] },
    { head: { hi: "नल-जल और स्ट्रीट लाइट", en: "Nal-Jal and streetlights" }, text: { hi: "जनवरी 2022 में भाजपा प्रतिनिधिमंडल के साथ नल-जल योजना की खामियाँ दूर करने और एलईडी/स्ट्रीट लाइट की माँग का ज्ञापन।", en: "in January 2022, joined a BJP delegation that submitted a memorandum to fix Nal-Jal scheme problems and install LED/street lights." }, proof: ["nuljal"] },
    { head: { hi: "नागरिक अधिकार", en: "Citizens’ rights" }, text: { hi: "नागरिक अधिकार मंच के संयोजक के रूप में नागरिकों के अधिकार और नगर परिषद की जवाबदेही के सवाल उठाए।", en: "as convener of the Nagrik Adhikar Manch, raised questions of citizens’ rights and municipal accountability." }, proof: ["court"] },
  ],
};

export const JOURNEY = {
  title: { hi: "संगठनात्मक सफर: 1995 से अब तक", en: "Organisational journey: 1995 to today" },
  timeline: [
    { year: "1995–2000", text: { hi: "जिला भाजयुमो एवं प्रदेश क्रीड़ा मंच में दायित्व", en: "Roles in district BJYM and the state sports forum" } },
    { year: "2019", text: { hi: "काँटी विधानसभा संयोजक (आईटी)", en: "Kanti assembly convener (IT)" } },
    { year: "2021", text: { hi: "जिला मीडिया प्रभारी, मुजफ्फरपुर", en: "District media in-charge, Muzaffarpur" } },
    { year: "2022", text: { hi: "16 वैशाली लोकसभा मीडिया प्रभारी; वैशाली लोकसभा एवं काँटी विधानसभा कोर कमेटी सदस्य", en: "Media in-charge, 16 Vaishali Lok Sabha; member of the Vaishali Lok Sabha and Kanti assembly core committees" } },
    { year: "2024", text: { hi: "बिहार भाजपा नमो ऐप क्षेत्रीय प्रभारी", en: "Bihar BJP NaMo App regional in-charge" }, proof: ["namo"] },
    { year: "2025", text: { hi: "जिला महामंत्री सह मुख्यालय प्रभारी, मुजफ्फरपुर पश्चिमी", en: "District General Secretary & Headquarters In-charge, Muzaffarpur West" }, proof: ["office"] },
  ],
  work: [
    { hi: "बोचहाँ और कुढनी उपचुनाव में चुनाव प्रबंधन एवं मीडिया मैनेजमेंट।", en: "Election management and media handling in the Bochahan and Kurhani bypolls." },
    { hi: "2024 लोकसभा चुनाव: राष्ट्रीय अध्यक्ष की साहेबगंज रैली का मीडिया प्रबंधन, केन्द्रीय नेताओं के प्रवास का संयोजन, लाभार्थियों के अनुभव के वीडियो का प्रसार।", en: "2024 Lok Sabha: media management of the national president’s Sahebganj rally, coordination of visiting central leaders, circulation of beneficiary-experience videos." },
    { hi: "27 मार्च 2025 तक 1596 में से 1580 बूथ पर बूथ कमेटी पूर्ण; 4 अप्रैल 2025 तक सभी 32 मंडलों में 61-सदस्यीय मंडल कमेटी गठित।", en: "Booth committees completed at 1580 of 1596 booths by 27 March 2025; 61-member committees formed in all 32 mandals by 4 April 2025." },
    { hi: "बिहार विधानसभा चुनाव: मोतीपुर (प्रधानमंत्री) एवं साहेबगंज (गृह मंत्री) जनसभाओं में जनसभा प्रमुख।", en: "Bihar assembly election: public-meeting chief for the Motipur (Prime Minister) and Sahebganj (Home Minister) rallies." },
    { hi: "जिला संयोजक के रूप में वक्फ जागरण, सेवा-सुशासन-गरीब कल्याण के 11 साल, आपातकाल, स्वदेशी संकल्प और अटल जयंती कार्यक्रम का संचालन; जिला चुनाव प्रबंधन समिति का नेतृत्व।", en: "As district convener, ran the Waqf awareness, 11 years of Seva-Sushasan-Garib Kalyan, Emergency, Swadeshi Sankalp and Atal Jayanti programmes; led the district election management committee." },
  ],
  note: { hi: "इस खंड के जीवन-वृत्त विवरण मेरे राजनीतिक/सामाजिक/सांगठनिक कार्य परिचय से हैं।", en: "Details in this section are from my political / social / organisational work profile." },
};

export const PROOF = {
  title: { hi: "मेरे कार्यों के प्रमाण", en: "Proof of my work" },
  intro: { hi: "हर लिंक नए टैब में खुलता है। आप स्वयं पढ़कर परख सकते हैं।", en: "Every link opens in a new tab so you can read and judge for yourself." },
  items: [
    { head: { hi: "जिला दायित्व (मार्च 2025)", en: "District role (March 2025)" }, text: { hi: "हिन्दुस्तान की रिपोर्ट में भाजपा मुजफ्फरपुर पश्चिमी जिला कमेटी के महामंत्री के रूप में नाम।", en: "Hindustan report naming me General Secretary of BJP Muzaffarpur West district committee." }, proof: ["office"] },
    { head: { hi: "नमो ऐप दायित्व (जनवरी 2024)", en: "NaMo App role (January 2024)" }, text: { hi: "हिन्दुस्तान के अनुसार बिहार भाजपा नमो ऐप का क्षेत्रीय प्रभारी नियुक्त किए जाने की सूचना।", en: "Hindustan report on my appointment as Bihar BJP NaMo App regional in-charge." }, proof: ["namo"] },
    { head: { hi: "होल्डिंग टैक्स आंदोलन (जनवरी 2024)", en: "Holding-tax agitation (January 2024)" }, text: { hi: "नागरिक अधिकार मंच की बैठक और आंदोलन जारी रखने की खबर, जिसमें मुझे मंच का प्रवक्ता बताया गया है। यह समाचार में दर्ज गतिविधि है, न्यायिक निष्कर्ष नहीं।", en: "news of the Manch meeting and decision to continue the movement, naming me as the Manch’s spokesperson. This is a reported activity, not a judicial finding." }, proof: ["tax"] },
    { head: { hi: "नल-जल एवं एलईडी लाइट (जनवरी 2022)", en: "Nal-Jal and LED lights (January 2022)" }, text: { hi: "भाजपा प्रतिनिधिमंडल का ज्ञापन; रिपोर्ट में मुझे जिला मीडिया प्रभारी बताया गया है।", en: "memorandum by a BJP delegation; the report names me as district media in-charge." }, proof: ["nuljal"] },
    { head: { hi: "न्यायालय का रिकॉर्ड, CWJC 19522/2024", en: "Court record, CWJC 19522/2024" }, text: { hi: "प्रकाशित निर्णय-पाठ के अनुसार याचिका 10 जनवरी 2025 को खारिज हुई; कारण दर्ज है कि कर से प्रभावित व्यक्ति को चुनौती देनी चाहिए। एक अन्य केस-डेटा साइट पर स्थिति “withdrawn” दिखती है, इसलिए अंतिम स्थिति के लिए पटना उच्च न्यायालय का आधिकारिक रिकॉर्ड देखें।", en: "the published judgment text records the petition as dismissed on 10 January 2025, noting that a person actually charged with the tax should challenge it. Another case-data site shows the status as “withdrawn”, so check the Patna High Court’s official record for the final position." }, proof: ["court", "court2"] },
  ],
};

export const VISION = {
  title: { hi: "काँटी के लिए मेरा विजन", en: "My vision for Kanti" },
  items: [
    { head: { hi: "स्वच्छता", en: "Cleanliness" }, text: { hi: "नियमित सफाई और कचरा उठाव की वार्डवार निगरानी।", en: "Ward-wise monitoring of regular cleaning and garbage collection." } },
    { head: { hi: "पेयजल", en: "Drinking water" }, text: { hi: "नल-जल योजना की खामियाँ दूर कराना।", en: "Getting the faults in the Nal-Jal scheme fixed." } },
    { head: { hi: "सड़क और नाली", en: "Roads and drains" }, text: { hi: "मरम्मत की सूची वार्ड के सामने सार्वजनिक करना।", en: "Publishing the repair list ward by ward." } },
    { head: { hi: "प्रकाश", en: "Lighting" }, text: { hi: "हर मोहल्ले में स्ट्रीट लाइट चालू रहे, यह सुनिश्चित करना।", en: "Making sure street lights work in every locality." } },
    { head: { hi: "पारदर्शिता", en: "Transparency" }, text: { hi: "कर निर्धारण और परिषद के खर्च की जानकारी जनता के सामने रखना।", en: "Putting tax assessment and council spending in front of the public." } },
    { head: { hi: "जवाबदेह प्रशासन", en: "Accountable administration" }, text: { hi: "शिकायत दर्ज करने, उसकी स्थिति जानने और नियमित जनसंवाद की व्यवस्था।", en: "A way to lodge complaints, track them, and regular public meetings." } },
  ],
};

export const CONNECT = {
  title: { hi: "सीधे मुझसे जुड़ें", en: "Connect with me directly" },
  supportTitle: { hi: "सहयोग करें", en: "Support the campaign" },
  shareTitle: { hi: "इस पेज को साझा करें", en: "Share this page" },
  upiText: { hi: "QR कोड स्कैन करके किसी भी UPI ऐप से स्वैच्छिक सहयोग करें।", en: "Scan the QR code with any UPI app to give a voluntary contribution." },
  upiNotSet: { hi: "सहयोग QR अभी सेट नहीं है।", en: "The support QR is not set up yet." },
  upiRule: { hi: "सहयोग पूर्णतः स्वैच्छिक है और लागू चुनाव-नियमों के अनुसार स्वीकार किया जाएगा।", en: "Contributions are voluntary and accepted in line with applicable election rules." },
  copyUpi: { hi: "UPI आईडी कॉपी करें", en: "Copy UPI ID" },
  copied: { hi: "UPI आईडी कॉपी हो गई।", en: "UPI ID copied." },
};

export const FORM = {
  typeLegend: { hi: "आप क्या करना चाहते हैं?", en: "What would you like to do?" },
  types: [
    { value: "जुड़ना / Join", label: { hi: "अभियान से जुड़ना", en: "Join the campaign" } },
    { value: "सुझाव / Suggestion", label: { hi: "सुझाव देना", en: "Give a suggestion" } },
    { value: "शिकायत / Complaint", label: { hi: "समस्या/शिकायत बताना", en: "Report a problem" } },
  ],
  name: { hi: "पूरा नाम *", en: "Full name *" },
  mobile: { hi: "मोबाइल नंबर *", en: "Mobile number *" },
  ward: { hi: "वार्ड संख्या", en: "Ward number" },
  email: { hi: "ईमेल (वैकल्पिक)", en: "Email (optional)" },
  address: { hi: "पता / मोहल्ला", en: "Address / locality" },
  helpLegend: { hi: "आप कैसे सहयोग करना चाहते हैं?", en: "How would you like to help?" },
  helps: [
    { value: "जनसंपर्क / Door-to-door", label: { hi: "जनसंपर्क", en: "Door-to-door" } },
    { value: "बूथ / Booth", label: { hi: "बूथ कार्य", en: "Booth work" } },
    { value: "सोशल मीडिया / Social media", label: { hi: "सोशल मीडिया", en: "Social media" } },
    { value: "वाहन / Vehicle", label: { hi: "वाहन / कार्यक्रम", en: "Vehicle / events" } },
    { value: "अन्य / Other", label: { hi: "अन्य", en: "Other" } },
  ],
  note: { hi: "आपकी बात", en: "Your message" },
  consent: { hi: "मैं सहमत हूँ कि अभियान टीम मुझसे इस नंबर पर संपर्क कर सकती है। *", en: "I agree that the campaign team may contact me on this number. *" },
  submit: { hi: "भेजें", en: "Send" },
  sending: { hi: "भेजा जा रहा है…", en: "Sending…" },
  msg: {
    ok: { hi: "धन्यवाद! आपकी बात पहुँच गई। टीम जल्द संपर्क करेगी।", en: "Thank you! Your message has arrived. The team will contact you soon." },
    invalid: { hi: "कृपया नाम और सही 10 अंकों का मोबाइल नंबर भरें; वार्ड 1–2 अंकों का हो।", en: "Please enter your name and a valid 10-digit mobile number; ward must be 1–2 digits." },
    consent: { hi: "कृपया सहमति पर टिक करें।", en: "Please tick the consent box." },
    notReady: { hi: "फ़ॉर्म अभी जुड़ा नहीं है।", en: "The form is not connected yet." },
    wait: { hi: "कृपया एक मिनट बाद फिर कोशिश करें।", en: "Please try again in a minute." },
    captcha: { hi: "कृपया सुरक्षा जाँच पूरी करें।", en: "Please complete the security check." },
    rate: { hi: "इस नंबर से अभी-अभी संदेश आ चुका है। कृपया कुछ देर बाद कोशिश करें।", en: "A message from this number was just received. Please try again shortly." },
    fail: { hi: "भेजा नहीं जा सका। इंटरनेट जाँचकर फिर कोशिश करें।", en: "Could not send. Check your connection and try again." },
  },
};
