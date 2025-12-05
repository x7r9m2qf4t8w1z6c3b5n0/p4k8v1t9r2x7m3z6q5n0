const subjectsData = [
    {
        name: "Physics",
        icon: "fas fa-atom",
        color: "#ff6b6b",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/151jDA055iJYF_Zbbiy-aEmhYsIwcgtKF" },
            { title: "তাপগতিবিদ্যা (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763056876449.pdf" },
            { title: "তাপগতিবিদ্যা (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763188021935.pdf" },
            { title: "তাপগতিবিদ্যা", url: "https://pdf.bondipathshala.education/1763464529676.pdf" },
            { title: "তাপগতিবিদ্যা", url: "https://pdf.bondipathshala.education/1763465281382.pdf" },
            { title: "চল তড়িৎ (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763706662406.pdf" },
            { title: "চল তড়িৎ (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763752226049.pdf" },
            { title: "চল তড়িৎ (পর্ব ৩)", url: "https://pdf.bondipathshala.education/1764745931774.pdf" },
            { title: "চল তড়িৎ(পর্ব ৩.১)", url: "https://pdf.bondipathshala.education/1764163097897.pdf" },
            { title: "চল তড়িৎ(পর্ব ৩.২)", url: "https://pdf.bondipathshala.education/1764163120127.pdf" },
            { title: "তড়িৎ চৌম্বক আবেশ ও দিক পরিবর্তি প্রবাহ (পর্ব ১)", url: "https://pdf.bondipathshala.education/1764745865396.pdf" },
            { title: "তড়িৎ চৌম্বক আবেশ ও দিক পরিবর্তি প্রবাহ (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764656303668.pdf" },
            { title: "তাড়িতচুম্বক আবেশ ও দিক পরিবর্তি প্রবাহ", url: "https://pdf.bondipathshala.education/1764486851309.pdf" },
            { title: "স্থির তড়িৎ (পর্ব ১)", url: "https://pdf.bondipathshala.education/1764744591071.pdf" },
            { title: "স্থির তড়িৎ (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764827731854.pdf" },
        ]
    },
    {
        name: "Chemistry",
        icon: "fas fa-flask",
        color: "#4ecdc4",
        pdfs: [
            { title: "Extra Materials", url: "" },
            { title: "পরিমাণগত রসায়ন (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763227445862.pdf" },
            { title: "পরিমাণগত রসায়ন (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763322423543.pdf" },
            { title: "পরিমাণগত রসায়ন (পর্ব ৩)", url: "https://pdf.bondipathshala.education/1763880211903.pdf" },
            { title: "পরিমাণগত রসায়ন (পর্ব ৪)", url: "https://pdf.bondipathshala.education/1763925454247.pdf" },
            { title: "পরিমাণগত রসায়ন", url: "https://pdf.bondipathshala.education/1764746170821.pdf" },
            { title: "পরিবেশ রসায়ন (পর্ব ১)", url: "https://pdf.bondipathshala.education/1764009000407.pdf" },
            { title: "পরিবেশ রসায়ন (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764140107313.pdf" },
            { title: "পরিবেশ রসায়ন", url: "https://pdf.bondipathshala.education/1764746215979.pdf" },
        ]
    },
    {
        name: "Mathematics",
        icon: "fas fa-square-root-alt",
        color: "#45b7d1",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1eGYXAlqLyT3Cx1Gao0ALRClqlms8e9vR" },
            { title: "জটিল সংখ্যা", url: "https://pdf.bondipathshala.education/1763407233652.pdf" },
            { title: "জটিল সংখ্যা", url: "https://pdf.bondipathshala.education/1763464645938.pdf" },
            { title: "বহুপদী ও বহুপদী সমীকরণ (পর্ব ১)", url: "https://pdf.bondipathshala.education/1764225114413.pdf" },
            { title: "বহুপদী ও বহুপদী সমীকরণ", url: "https://pdf.bondipathshala.education/1764746291691.pdf" },
            { title: "বহুপদী ও বহুপদী সমীকরণ (Part-2)", url: "https://pdf.bondipathshala.education/1764225138030.pdf" },
            { title: "বিস্তার পরিমাপ ও সম্ভবনা (পর্ব ১)", url: "https://pdf.bondipathshala.education/1764486880297.pdf" },
            { title: "বিস্তার পরিমাপ ও সম্ভবনা(পর্ব ২)", url: "https://pdf.bondipathshala.education/1764569739585.pdf" },
            
        ]
    },
    {
        name: "Biology",
        icon: "fas fa-dna",
        color: "#96ceb4",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1Ghs6FfGjpllcFGZR-1rM4fmzL--k7dnS" },
            { title: "Marked Books", url: "https://drive.google.com/drive/folders/1z-9yAOmVYmIcB4RhtEnO1YatCBoXUYq6?usp=sharing" },
            { title: "রক্ত ও সংবহন (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763534808594.pdf" },
            { title: "রক্ত ও সংবহন (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763584843900.pdf" },
            { title: "রক্ত ও সংবহন", url: "https://pdf.bondipathshala.education/1764746002684.pdf" },
            { title: "জিনতত্ত্ব ও বিবর্তন", url: "https://pdf.bondipathshala.education/1764314008901.pdf" },
            { title: "জিনতত্ত্ব ও বিবর্তন", url: "https://pdf.bondipathshala.education/1764746103069.pdf" },
            { title: "জিনতত্ত্ব ও বিবর্তন (Part 2 )", url: "https://pdf.bondipathshala.education/1764314029543.pdf" },
            { title: "শ্বসন ও শ্বাসক্রিয়া", url: "https://pdf.bondipathshala.education/1764656265575.pdf" },
            { title: "শ্বসন ও শ্বাসক্রিয়া", url: "https://pdf.bondipathshala.education/1764746052266.pdf" },
        ]
    },
    {
        name: "English",
        icon: "fas fa-book",
        color: "#feca57",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1u-Ff0iuERR_9VGYxtkcaL0ciI13rskoM" },
            { title: "Modifiers", url: "https://pdf.bondipathshala.education/1762843091091.pdf" },
            { title: "Modifiers", url: "https://pdf.bondipathshala.education/1763464887090.pdf" },
            { title: "Completing Sentence (Part 1) + Paragraph Writing", url: "https://pdf.bondipathshala.education/1762968603302.pdf" },
            { title: "Completing Sentence (Part 2)", url: "https://pdf.bondipathshala.education/1763728012028.pdf" },
            { title: "Completing Sentence", url: "https://pdf.bondipathshala.education/1763464989155.pdf" },
            { title: "Completing Sentence", url: "https://pdf.bondipathshala.education/1764746682311.pdf" },
            { title: "Right Forms of Verb (Part 1)", url: "https://pdf.bondipathshala.education/1763880535030.pdf" },
            { title: "Right Forms of Verbs (Part 2)", url: "https://pdf.bondipathshala.education/1764336296990.pdf" },
            { title: "Narration (Part 1)", url: "https://pdf.bondipathshala.education/1764493430797.pdf" },
            { title: "Narration", url: "https://pdf.bondipathshala.education/1764746994250.pdf" },
        ]
    },
    {
        name: "Bangla",
        icon: "fas fa-language",
        color: "#ff9ff3",
        pdfs: [
            { title: "Extra Materials", url: "" },
            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ১) + তাহারেই পড়ে মনে", url: "https://pdf.bondipathshala.education/1762619703676.pdf" },
            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ২) + যৌবনের গান", url: "https://pdf.bondipathshala.education/1762707908751.pdf" },
            { title: "বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ", url: "https://pdf.bondipathshala.education/1763035748580.pdf" },
            { title: "বাক্য প্রকরণ (পর্ব ১) + আঠারো বছর বয়স + সোনার তরী", url: "https://pdf.bondipathshala.education/1763116435241.pdf" },
            { title: "বাক্য প্রকরণ (পর্ব ২) + বিদ্রোহী", url: "https://pdf.bondipathshala.education/1763460159824.pdf" },
            { title: "বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন + প্রতিদান", url: "https://pdf.bondipathshala.education/1763546936166.pdf" },
            { title: "সমাস (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763982612000.pdf" },
            { title: "সমাস (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764239717786.pdf" },
            { title: "লালসালু", url: "https://pdf.bondipathshala.education/1764591444451.pdf" },
            { title: "আমি কিংবদন্তির কথা বলছি ও মাসি পিসি", url: "https://pdf.bondipathshala.education/1764761970035.pdf" },
        ]
    },
    {
        name: "ICT",
        icon: "fas fa-laptop-code",
        color: "#54a0ff",
        pdfs: [
          { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1QhkfOgtXv3AHbS5mGdBLiOzaam1AZfL7" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ১)", url: "https://pdf.bondipathshala.education/1762884933460.pdf" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763211271973.pdf" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ৩)", url: "https://pdf.bondipathshala.education/1763382953989.pdf" },
          { title: "সংখ্যা পদ্ধতি", url: "https://pdf.bondipathshala.education/1763464776253.pdf" },
          { title: "ডিজিটাল ডিভাইস (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763898420620.pdf" },
          { title: "ডিজিটাল ডিভাইস (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764074775351.pdf" },
          { title: "ডিজিটাল ডিভাইস (পর্ব ৩)", url: "https://pdf.bondipathshala.education/1764506696198.pdf" },
          { title: "ডিজিটাল ডিভাইস (পর্ব-০৪)", url: "https://pdf.bondipathshala.education/1764684859592.pdf" },
          { title: "বিশ্ব ও বাংলাদেশ প্রেক্ষিত", url: "https://pdf.bondipathshala.education/1764851368958.pdf" },
        ]
    },
            {
                name: "Mentorship Session",
                icon: "fas fa-chalkboard-teacher",
                color: "#9b59b6",
                isPCMB: false,
                pdfs: [
            { title: "Biology Mentorship Session", url: "https://pdf.bondipathshala.education/1762187871688.pdf" },
            { title: "Chemistry Mentorship Session", url: "https://pdf.bondipathshala.education/1762367202708.pdf" },
            { title: "Mathematics Mentorship Session", url: "https://pdf.bondipathshala.education/1762358963901.pdf" },
            { title: "EBI Mentorship Session", url: "https://pdf.bondipathshala.education/1762496803180.pdf" },
            { title: "Physics Mentorship Session", url: "https://pdf.bondipathshala.education/1762583681705.pdf" },
                ]
            }
];
