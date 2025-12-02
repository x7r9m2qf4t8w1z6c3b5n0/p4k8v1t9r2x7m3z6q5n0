const subjectsData = [
            {
                name: "Physics",
                icon: "fas fa-atom",
                color: "#ff6b6b",
                isPCMB: true,
                lectures: [
                            { title: "তাপগতিবিদ্যা (পর্ব ১)", videoId: "nxVrNvcF1gg" },
                            { title: "তাপগতিবিদ্যা (পর্ব ২)", videoId: "iKgoLAZdtZQ" },
                            { title: "চল তড়িৎ (পর্ব ১)", videoId: "7xb15PjCKuw" },
                            { title: "চল তড়িৎ (পর্ব ২)", videoId: "NkjXvyaAh6s" },
                            { title: "চল তড়িৎ (পর্ব ৩.১)", videoId: "Y6NMHXLkqsE" },
                            { title: "চল তড়িৎ (পর্ব ৩.২)", videoId: "gJ83lRK2wrg" },
                            { title: "তড়িৎ চৌম্বক আবেশ ও দিক পরিবর্তি প্রবাহ (পর্ব ১)", videoId: "Fzv2yjGdXT0" },
                            { title: "তড়িৎ চৌম্বক আবেশ ও দিক পরিবর্তি প্রবাহ (পর্ব ২)", videoId: "5b3moH1Cil8" },
                ]
            },
            {
                name: "Chemistry",
                icon: "fas fa-flask",
                color: "#4ecdc4",
                isPCMB: true,
                lectures: [
                            { title: "পরিমাণগত রসায়ন (পর্ব ১)", videoId: "Qxmp4EeI6EU" },
                            { title: "পরিমাণগত রসায়ন (পর্ব ২)", videoId: "NwVR9w0yzQQ" },
                            { title: "পরিমাণগত রসায়ন (পর্ব ৩)", videoId: "8MLckn_SDE4" },
                            { title: "পরিমাণগত রসায়ন (পর্ব ৪)", videoId: "0iXWs77tBkI" },
                            { title: "পরিবেশ রসায়ন (পর্ব ১)", videoId: "JkUOau5paVw" },
                            { title: "পরিবেশ রসায়ন (পর্ব ২)", videoId: "F7im_JADR-0" },              
                ]
            },
            {
                name: "Mathematics",
                icon: "fas fa-square-root-alt",
                color: "#45b7d1",
                isPCMB: true,
                lectures: [
                            { title: "জটিল সংখ্যা", videoId: "dtj4kGIKa2M" },
                            { title: "বহুপদী ও বহুপদী সমীকরণ (পর্ব ১)", videoId: "csDRee8Tp_s" },
                            { title: "বহুপদী ও বহুপদী সমীকরণ (পর্ব ২)", videoId: "IraIKpoDT9M" },
                            { title: "বিস্তার পরিমাপ ও সম্ভবনা (পর্ব ১)", videoId: "vvO2V2PvGRc" },
                            { title: "বিস্তার পরিমাপ ও সম্ভবনা(পর্ব ২)", videoId: "TRCXgal2ySk" },
                ]
            },
            {
                name: "Biology",
                icon: "fas fa-dna",
                color: "#96ceb4",
                isPCMB: true,
                lectures: [
                            { title: "রক্ত ও সংবহন (পর্ব ১)", videoId: "0s-K-wv1Ym8" },
                            { title: "রক্ত ও সংবহন (পর্ব ২)", videoId: "TnEeRzrx8jY" },
                            { title: "জিনতত্ত্ব ও বিবর্তন (পর্ব ১.১)", videoId: "OVEia2xzR1M" },
                            { title: "জিনতত্ত্ব ও বিবর্তন (পর্ব ১.২)", videoId: "1qHmpY5yfh8" },
                            { title: "শ্বসন ও শ্বাসক্রিয়া", videoId: "suTJQaWwGBE" },
                ]
            },
            {
                name: "English",
                icon: "fas fa-book",
                color: "#feca57",
                isPCMB: false,
                lectures: [
                            { title: "Modifiers", videoId: "AWV1ro6RGs0" },
                            { title: "Completing Sentence (Part 1) + Paragraph Writing", videoId: "Aqx-UhthZUc" },
                            { title: "Completing Sentence (Part 2)", videoId: "OHuxXa1jA0U" },
                            { title: "Right Forms of Verb (Part 1)", videoId: "KStQbCt68Cc" },
                            { title: "Right Forms of Verbs (Part 2)", videoId: "9w9vlPPuwDU" },
                            { title: "Narration (Part 1)", videoId: "hQyBo-MVZqs" },
                ]
            },
            {
                name: "Bangla",
                icon: "fas fa-language",
                color: "#ff9ff3",
                isPCMB: false,
                lectures: [
                            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ১) + তাহারেই পড়ে মনে", videoId: "PVcJjU8tdtY" },
                            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ২) + যৌবনের গান", videoId: "2jTgvYrtNgM" },
                            { title: "বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ", videoId: "7GK3_s7RMMY" },
                            { title: "বাক্য প্রকরণ (পর্ব ১) + আঠারো বছর বয়স + সোনার তরী", videoId: "KGlHm2zZQeA" },
                            { title: "বাক্য প্রকরণ (পর্ব ২) + বিদ্রোহী", videoId: "G28XEYXk54I" },
                            { title: "বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন + প্রতিদান", videoId: "Cgzmqf3xu9s" },
                            { title: "সমাস (পর্ব ১)", videoId: "L_8SRL5_XNs" },
                            { title: "সমাস (পর্ব ২)", videoId: "01jMj-YH94I" },
                            { title: "লালসালু", videoId: "qIiUxsd5Rsg" }
                ]
            },
            {
                name: "ICT",
                icon: "fas fa-laptop-code",
                color: "#54a0ff",
                isPCMB: false,
                lectures: [
                            { title: "সংখ্যা পদ্ধতি (পর্ব ১)", videoId: "iK-lo9RU6dA" },
                            { title: "সংখ্যা পদ্ধতি (পর্ব ২)", videoId: "l75rI34jB_k" },
                            { title: "সংখ্যা পদ্ধতি (পর্ব ৩)", videoId: "voSerxe4EAE" },
                            { title: "ডিজিটাল ডিভাইস (পর্ব ১)", videoId: "bARRLtrId7M" },
                            { title: "ডিজিটাল ডিভাইস (পর্ব ২)", videoId: "UOaOIvt_czA" },
                            { title: "ডিজিটাল ডিভাইস (পর্ব ৩)", videoId: "iQ5edgbw-CU" },
                ]
            },
                        {
                name: "Mentorship Session",
                icon: "fas fa-chalkboard-teacher",
                color: "#9b59b6",
                isPCMB: false,
                lectures: [
                            { title: "Biology Mentorship Session", videoId: "uPM53Lax6Xg" },
                            { title: "Chemistry Mentorship Session", videoId: "JaWMEEB_iGc" },
                            { title: "Mathematics Mentorship Session", videoId: "olV8M7xp_sI" },
                            { title: "EBI Mentorship Session", videoId: "xPMUGXdgs1Y" },
                            { title: "Physics Mentorship Session", videoId: "TkVrn8T-ZlU" }
                ]
            }
        ];


