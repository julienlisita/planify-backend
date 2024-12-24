const mockRecipe = [
    {
      title: "Pâtes Carbonara",
      image: "https://example.com/images/pasta_carbonara.jpg",
      image_name: "pasta_carbonara.jpg",
      description: "Un plat italien classique avec une sauce crémeuse et du bacon.",
      time: "00:30:00",
      instructions: "Cuire les pâtes. Faire frire le bacon. Mélanger avec des œufs et du fromage. Combiner avec les pâtes.",
      difficulty: 2,
      priceLevel: 2,
      country: "Italie",
      likesCount: 120,
      userId: 1,
    },
    {
      title: "Curry de Poulet",
      image: "https://example.com/images/chicken_curry.jpg",
      image_name: "chicken_curry.jpg",
      description: "Un curry de poulet épicé et savoureux avec des épices aromatiques.",
      time: "01:00:00",
      instructions: "Faire revenir les oignons, l'ail et le gingembre. Ajouter le poulet et la poudre de curry. Laisser mijoter avec du lait de coco.",
      difficulty: 3,
      priceLevel: 3,
      country: "Inde",
      likesCount: 95,
      userId: 2,
    },
    {
      title: "Sushis",
      image: "https://example.com/images/sushi_rolls.jpg",
      image_name: "sushi_rolls.jpg",
      description: "Des rouleaux de sushi frais et savoureux avec de l'avocat et du saumon.",
      time: "00:45:00",
      instructions: "Préparer le riz à sushi. Trancher le poisson. Rouler les ingrédients avec du nori et du riz.",
      difficulty: 4,
      priceLevel: 3,
      country: "Japon",
      likesCount: 180,
      userId: 3,
    },
    {
      title: "Poêlée de Légumes",
      image: "https://example.com/images/vegetable_stir_fry.jpg",
      image_name: "vegetable_stir_fry.jpg",
      description: "Une poêlée saine de légumes variés avec de la sauce soja.",
      time: "00:25:00",
      instructions: "Faire sauter les légumes dans une poêle chaude. Ajouter la sauce soja et servir avec du riz.",
      difficulty: 1,
      priceLevel: 1,
      country: "Chine",
      likesCount: 60,
      userId: 4,
    },
    {
      title: "Gâteau au Chocolat",
      image: "https://example.com/images/chocolate_cake.jpg",
      image_name: "chocolate_cake.jpg",
      description: "Un gâteau au chocolat riche et moelleux avec un glaçage crémeux.",
      time: "01:30:00",
      instructions: "Cuire les couches de gâteau. Préparer le glaçage. Assembler et décorer le gâteau.",
      difficulty: 3,
      priceLevel: 2,
      country: "France",
      likesCount: 220,
      userId: 5,
    },
    {
      title: "Tacos au Bœuf",
      image: "https://example.com/images/beef_tacos.jpg",
      image_name: "beef_tacos.jpg",
      description: "Des tacos délicieux au bœuf avec des garnitures fraîches et de la salsa.",
      time: "00:20:00",
      instructions: "Cuire le bœuf. Préparer les garnitures. Assembler les tacos.",
      difficulty: 2,
      priceLevel: 1,
      country: "Mexique",
      likesCount: 110,
      userId: 5,
    },
    {
      title: "Salade César",
      image: "https://example.com/images/caesar_salad.jpg",
      image_name: "caesar_salad.jpg",
      description: "De la laitue croquante avec une vinaigrette César, des croûtons et du parmesan.",
      time: "00:15:00",
      instructions: "Mélanger la laitue avec la vinaigrette. Ajouter les croûtons et le parmesan.",
      difficulty: 1,
      priceLevel: 1,
      country: "États-Unis",
      likesCount: 85,
      userId: 4,
    },
    {
      title: "Côtelettes d'Agneau",
      image: "https://example.com/images/lamb_chops.jpg",
      image_name: "lamb_chops.jpg",
      description: "Des côtelettes d'agneau tendres et savoureuses avec du romarin et de l'ail.",
      time: "00:50:00",
      instructions: "Assaisonner l'agneau. Faire dorer dans une poêle. Rôtir au four.",
      difficulty: 4,
      priceLevel: 4,
      country: "Australie",
      likesCount: 130,
      userId: 3,
    },
    {
      title: "Quiche aux Épinards",
      image: "https://example.com/images/spinach_quiche.jpg",
      image_name: "spinach_quiche.jpg",
      description: "Une quiche salée remplie d'épinards et de fromage.",
      time: "01:10:00",
      instructions: "Préparer la croûte. Mélanger la garniture. Cuire jusqu'à ce qu'elle soit dorée.",
      difficulty: 3,
      priceLevel: 2,
      country: "France",
      likesCount: 70,
      userId: 2,
    },
    {
      title: "Saumon Grillé",
      image: "https://example.com/images/grilled_salmon.jpg",
      image_name: "grilled_salmon.jpg",
      description: "Des filets de saumon grillés avec du citron et des herbes.",
      time: "00:40:00",
      instructions: "Assaisonner le saumon. Griller à feu moyen jusqu'à ce qu'il soit cuit.",
      difficulty: 2,
      priceLevel: 3,
      country: "Norvège",
      likesCount: 160,
      userId: 1,
    }
  ];
  
  export default mockRecipe;