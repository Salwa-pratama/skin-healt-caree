export const acneRecommendations = [
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
      "Sabar"
    ]
  }
];

// Contoh script seeding jika ingin dimasukkan ke database:
/*
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedRecommendations() {
  // Disini kita bisa menambahkan logika untuk memasukkan data rekomendasi ke database,
  // namun berdasarkan schema saat ini (AcneProblem terhubung dengan User, dan BadIngredient terhubung ke AcneProblem),
  // data rekomendasi ini mungkin lebih cocok digunakan sebagai data statis (constant)
  // yang dipanggil saat user mendapatkan hasil prediksi, atau jika schema di-update
  // untuk menyimpan master data rekomendasi secara global.

  console.log("Seeding data rekomendasi...");
  console.log(acneRecommendations);
}

seedRecommendations()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
*/
