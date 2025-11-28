const subjectsData = [
    {
        name: "Physics",
        icon: "fas fa-atom",
        color: "#ff6b6b",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/151jDA055iJYF_Zbbiy-aEmhYsIwcgtKF" },
            { title: "তাপগতিবিদ্যা (পর্ব ১)", url: "https://drive.google.com/file/d/15Vfrjtb4huhL3K0AeHZJEhbiSPWIc06v/view?usp=sharing" },
            { title: "তাপগতিবিদ্যা (পর্ব ২)", url: "https://drive.google.com/file/d/1medv1fpuzkwEIGiPKLgxchWye8pl16jh/view?usp=sharing" },
            { title: "চল তড়িৎ (পর্ব ১)", url: "https://drive.google.com/file/d/15n3TdCredxmPmPAVfPsOcCvA2YalKdkN/view?usp=sharing" },
            { title: "চল তড়িৎ (পর্ব ২)", url: "https://drive.google.com/file/d/1Hs753GXue2cTET7qcJZkWCAWrLsu1aJs/view?usp=sharing" },
            { title: "চল তড়িৎ (পর্ব ৩)", url: "https://drive.google.com/file/d/120ZcFfXsH04AemDGALwnGOOC0dv0fka9/view?usp=sharing" },
        ]
    },
    {
        name: "Chemistry",
        icon: "fas fa-flask",
        color: "#4ecdc4",
        pdfs: [
            { title: "Extra Materials", url: "" },
            { title: "পরিমাণগত রসায়ন (পর্ব ১)", url: "https://drive.google.com/file/d/1V1enru7OB7Olxg5P1SVVMoF5mPftmqei/view?usp=sharing" },
            { title: "পরিমাণগত রসায়ন (পর্ব ২)", url: "https://drive.google.com/file/d/1hcpRhJ6aqgsCA5EjG3q3NOXGOlOkuVmc/view?usp=sharing" },
            { title: "পরিমাণগত রসায়ন (পর্ব ৩)", url: "https://drive.google.com/file/d/1dF58DMF8XaBMIf6bT8GXUQYgJNaaHO9r/view?usp=sharing" },
            { title: "পরিমাণগত রসায়ন (পর্ব ৪)", url: "https://drive.google.com/file/d/1P3Gp7TSYKCYZO_duuU9jwweuYTCY4d3I/view?usp=sharing" },
            { title: "পরিবেশ রসায়ন (পর্ব ১)", url: "https://drive.google.com/file/d/1k_TiN4z4rGzcnW_jPb-T1C5J2PPR0rUj/view?usp=sharing" },
            { title: "পরিবেশ রসায়ন (পর্ব ২)", url: "https://drive.google.com/file/d/1nVh5K_E25c3_8Y_gfUYpHK8UY2ymiIal/view?usp=sharing" },
        ]
    },
    {
        name: "Mathematics",
        icon: "fas fa-square-root-alt",
        color: "#45b7d1",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1eGYXAlqLyT3Cx1Gao0ALRClqlms8e9vR" },
            { title: "জটিল সংখ্যা", url: "https://drive.google.com/file/d/1CD7lRNuTV4UVyp-NARqa0NMaKnlyJlbY/view?usp=sharing" },
            { title: "বহুপদী ও বহুপদী সমীকরণ (পর্ব ১)", url: "https://drive.google.com/file/d/1w45S_DEgdwMRjp4jxNAABLxJqpd25F8a/view?usp=sharing" },
        ]
    },
    {
        name: "Biology",
        icon: "fas fa-dna",
        color: "#96ceb4",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1Ghs6FfGjpllcFGZR-1rM4fmzL--k7dnS" },
            { title: "Marked Books", url: "https://drive.google.com/drive/folders/1z-9yAOmVYmIcB4RhtEnO1YatCBoXUYq6?usp=sharing" },
            { title: "রক্ত ও সংবহন (পর্ব ১)", url: "https://drive.google.com/file/d/1Kq2M73qvdWa2vGx9GSQUZZxOraxUnmNW/view?usp=sharing" },
            { title: "রক্ত ও সংবহন (পর্ব ২)", url: "https://drive.google.com/file/d/1Zn2L2XlUkyG_BHKztX6s_HJtdvkrBeYL/view?usp=sharing" },
            { title: "জীনতত্ত্ব ও বিবর্তন", url: "https://drive.google.com/file/d/1TK7uw1ooVOFXHjqq4sxJ04s_Bpm4xyyT/view?usp=sharing" },
        ]
    },
    {
        name: "English",
        icon: "fas fa-book",
        color: "#feca57",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1u-Ff0iuERR_9VGYxtkcaL0ciI13rskoM" },
            { title: "Modifiers", url: "https://drive.google.com/file/d/1b7qt4h_Yw0Xu0CIPCytnsl5SK0OLF4o8/view?usp=sharing" },
            { title: "Completing Sentence (Part 1) + Paragraph Writing", url: "https://drive.google.com/file/d/1r7CfS4JlAvj9SzkreHFhgV03T7qXNHnb/view?usp=sharing" },
            { title: "Completing Sentence (Part 2)", url: "https://drive.google.com/file/d/1yFd_7-MWScZnDpwfLsvVQNtR5J-LDIWN/view?usp=sharing" },
            { title: "Right Forms of Verb (Part 1)", url: "https://drive.google.com/file/d/1OqilCwlF_HbH8yUm2rJhHQ24ihDlegps/view?usp=sharing" },
        ]
    },
    {
        name: "Bangla",
        icon: "fas fa-language",
        color: "#ff9ff3",
        pdfs: [
            { title: "Extra Materials", url: "" },
            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ১) + তাহারেই পড়ে মনে", url: "https://pdf.bondipathshala.education/1762619703676.pdf" },
            { title: "ব্যাকরণিক শব্দশ্রেণি (পর্ব ২) + যৌবনের গান", url: "https://drive.google.com/file/d/1nAxQcK-MIZrfZTYdTe5qgXmTmxEIfHeI/view?usp=sharing" },
            { title: "বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ", url: "https://pdf.bondipathshala.education/1763035748580.pdf" },
            { title: "বাক্য প্রকরণ (পর্ব ১) + আঠারো বছর বয়স + সোনার তরী", url: "https://drive.google.com/file/d/1eAijbLArD39dmfGEyJ9STQE_s0SNOki4/view?usp=sharing" },
            { title: "বাক্য প্রকরণ (পর্ব ২) + বিদ্রোহী", url: "https://drive.google.com/file/d/1sURbllgb9vDL6b4icRVCQxjPNULAMXjy/view?usp=sharing" },
            { title: "বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন + প্রতিদান", url: "https://drive.google.com/file/d/1c1h5HN-OoyoTtAykNjtekI39GWzGIY5W/view?usp=sharing" },
            { title: "সমাস (পর্ব ১)", url: "https://drive.google.com/file/d/1lSALJ84ytxt0tcp5K7pCMq10lNch5-Xd/view?usp=sharing" },
            { title: "সমাস (পর্ব ২)", url: "https://pdf.bondipathshala.education/1764239717786.pdf" },
        ]
    },
    {
        name: "ICT",
        icon: "fas fa-laptop-code",
        color: "#54a0ff",
        pdfs: [
          { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1QhkfOgtXv3AHbS5mGdBLiOzaam1AZfL7" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ১)", url: "https://drive.google.com/file/d/1RjrslBfTwBj5iklQ0I_phF5s1Bdl9qnJ/view?usp=sharing" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ২)", url: "https://drive.google.com/file/d/1k1lSTHzeUQXVN2xtVaDertYymJOqQsYR/view?usp=sharing" },
          { title: "সংখ্যা পদ্ধতি (পর্ব ৩)", url: "https://drive.google.com/file/d/1rbGPIJ6VSOgc5PEBeabNYJly_eP1ah9I/view?usp=sharing" },
          { title: "ডিজিটাল ডিভাইস (পর্ব ১)", url: "https://drive.google.com/file/d/1CyJzG-yw0npxDFndc-C8o7e3j_SMclnV/view?usp=sharing" },
          { title: "ডিজিটাল ডিভাইস (পর্ব ২)", url: "https://drive.google.com/file/d/18f4uLCrfmWWaAy03s-DEVVOhrbFC46SK/view?usp=sharing" },
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
            { title: "EBI Mentorship Session", url: "https://drive.google.com/file/d/17gsq81LE_n4ziQjIC5kyJSWrkuKVQYyX/view?usp=sharing" },
            { title: "Physics Mentorship Session", url: "https://pdf.bondipathshala.education/1762583681705.pdf" },
                ]
            }
];
