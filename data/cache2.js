const subjectsData = [
    {
        name: "Physics",
        icon: "fas fa-atom",
        color: "#ff6b6b",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/151jDA055iJYF_Zbbiy-aEmhYsIwcgtKF" },
            { title: "তাপগতিবিদ্যা (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763056876449.pdf" },
            { title: "তাপগতিবিদ্যা (পর্ব ২)", url: "https://pdf.bondipathshala.education/1763188021935.pdf" },
            { title: "চল তড়িৎ (পর্ব ১)", url: "https://pdf.bondipathshala.education/1763706662406.pdf" },
            { title: "চল তড়িৎ (পর্ব ২)", url: "https://drive.google.com/file/d/1Hs753GXue2cTET7qcJZkWCAWrLsu1aJs/view?usp=sharing" },
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
            { title: "পরিমাণগত রসায়ন (পর্ব ৩)", url: "https://drive.google.com/file/d/1dF58DMF8XaBMIf6bT8GXUQYgJNaaHO9r/view?usp=sharing" },
        ]
    },
    {
        name: "Mathematics",
        icon: "fas fa-square-root-alt",
        color: "#45b7d1",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1eGYXAlqLyT3Cx1Gao0ALRClqlms8e9vR" },
            { title: "জটিল সংখ্যা", url: "https://pdf.bondipathshala.education/1763407233652.pdf" },
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
            { title: "রক্ত ও সংবহন (পর্ব ২)", url: "https://drive.google.com/file/d/1Zn2L2XlUkyG_BHKztX6s_HJtdvkrBeYL/view?usp=sharing" },
        ]
    },
    {
        name: "English",
        icon: "fas fa-book",
        color: "#feca57",
        pdfs: [
            { title: "Extra Materials", url: "https://drive.google.com/drive/folders/1u-Ff0iuERR_9VGYxtkcaL0ciI13rskoM" },
            { title: "Modifiers", url: "https://pdf.bondipathshala.education/1762843091091.pdf" },
            { title: "Completing Sentence (Part 1) + Paragraph Writing", url: "https://pdf.bondipathshala.education/1762968603302.pdf" },
            { title: "Completing Sentence (Part 2)", url: "https://pdf.bondipathshala.education/1763464989155.pdf" },
            { title: "Right Forms of Verb (Part 1)", url: "https://pdf.bondipathshala.education/1763880535030.pdf" },
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
            { title: "বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন + প্রতিদান", url: "https://pdf.bondipathshala.education/1763546936166.pdf" }
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
