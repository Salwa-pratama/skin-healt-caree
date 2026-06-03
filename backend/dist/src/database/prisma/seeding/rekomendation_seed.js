"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acneRecommendations = void 0;
exports.acneRecommendations = [
    {
        type: "Cyst",
        description: "Jerawat kecil meradang",
        goodIngredients: [
            "Salicylic Acid (BHA): Face wash, Toner, Serum",
            "Benzoyl Peroxide",
            "Retinoid / Retinol / Adapalene",
            "Niacinamide",
            "Azelaic acid",
            "Sulfur"
        ],
        badIngredients: [
            "Heavy Oils: Coconut oil, mineral oil, lanolin",
            "Thick cream",
            "Greasy moisturizer",
            "Makeup comedogenic",
            "Scrub walnut",
            "Physical exfoliator kasar"
        ],
        habits: [
            "Jangan sering dipencet",
            "Jangan over exfoliate",
            "Sabar"
        ],
        treatments: [
            { name: "Kompres hangat", time: "Kapan saja" },
            { name: "Spot Treatment BHA/Benzoyl Peroxide", time: "Malam" }
        ]
    },
    {
        type: "Pustules",
        description: "Jerawat kecil meradang",
        goodIngredients: [
            "Salicylic Acid (BHA): Face wash, Toner, Serum",
            "Benzoyl Peroxide",
            "Retinoid / Retinol / Adapalene",
            "Niacinamide",
            "Azelaic acid",
            "Sulfur"
        ],
        badIngredients: [
            "Heavy Oils: Coconut oil, mineral oil, lanolin",
            "Thick cream",
            "Greasy moisturizer",
            "Makeup comedogenic",
            "Scrub walnut",
            "Physical exfoliator kasar"
        ],
        habits: [
            "Jangan sering dipencet",
            "Jangan over exfoliate",
            "Sabar"
        ],
        treatments: [
            { name: "Pimple patch", time: "Kapan saja" },
            { name: "Spot Treatment Benzoyl Peroxide / Sulfur", time: "Malam" }
        ]
    },
    {
        type: "Papules",
        description: "Jerawat kecil meradang",
        goodIngredients: [
            "Salicylic Acid (BHA): Face wash, Toner, Serum",
            "Benzoyl Peroxide",
            "Retinoid / Retinol / Adapalene",
            "Niacinamide",
            "Azelaic acid",
            "Tea Tree Oil"
        ],
        badIngredients: [
            "Heavy Oils: Coconut oil, mineral oil, lanolin",
            "Thick cream",
            "Greasy moisturizer",
            "Makeup comedogenic",
            "Scrub walnut",
            "Physical exfoliator kasar"
        ],
        habits: [
            "Jangan sering dipencet",
            "Jangan over exfoliate",
            "Sabar"
        ],
        treatments: [
            { name: "Double cleansing", time: "Malam" },
            { name: "Eksfoliasi ringan BHA", time: "Malam" }
        ]
    },
    {
        type: "WhiteHead / Blackhead",
        description: "Komedo",
        goodIngredients: [
            "Salicylic Acid (BHA): Face wash, Toner, Serum",
            "Retinoid",
            "Niacinamide",
            "AHA (Glycolic / Lactic acid)",
            "Azelaic Acid"
        ],
        badIngredients: [
            "Heavy Oils: Coconut oil, mineral oil, lanolin",
            "Thick cream",
            "Greasy moisturizer",
            "Makeup comedogenic",
            "Scrub walnut",
            "Physical exfoliator kasar"
        ],
        habits: [
            "Jangan sering dipencet",
            "Jangan over exfoliate",
            "Sabar",
            "Jangan telalu stress, relax"
        ],
        treatments: [
            { name: "Double cleansing", time: "Malam" },
            { name: "Clay mask", time: "Seminggu 1-2 kali" },
            { name: "Eksfoliasi BHA/AHA", time: "Malam" }
        ]
    }
];
// Script seeding untuk memasukkan data rekomendasi ke database
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRecommendations() {
    console.log("Seeding data rekomendasi...");
    // Hapus data lama agar tidak duplikat (karena ini master data)
    await prisma.acneSolution.deleteMany({
        where: {
            userId: null
        }
    });
    // Hapus master data habit, treatment, ingredients yang tidak ada relasi, tapi delete cascade pada prisma tidak disetel.
    // Lebih aman jika kita hapus secara eksplisit data yang terkait (atau biarkan yatim piatu untuk sementara, 
    // karena relasinya di-handle oleh m-n implicitly).
    for (const rec of exports.acneRecommendations) {
        console.log(`Memasukkan solusi untuk: ${rec.type}`);
        await prisma.acneSolution.create({
            data: {
                type: rec.type,
                description: rec.description,
                userId: null, // Global / Master data
                goodIngredient: {
                    create: rec.goodIngredients.map(ingredient => ({ name: ingredient }))
                },
                badIngredient: {
                    create: rec.badIngredients.map(ingredient => ({ name: ingredient }))
                },
                habits: {
                    create: rec.habits.map(habit => ({ name: habit }))
                },
                treatments: {
                    create: rec.treatments.map(treatment => ({
                        name: treatment.name,
                        time: treatment.time
                    }))
                }
            }
        });
    }
    console.log("✅ Seeding selesai!");
}
if (require.main === module) {
    seedRecommendations()
        .catch(e => {
        console.error(e);
        process.exit(1);
    })
        .finally(async () => {
        await prisma.$disconnect();
    });
}
