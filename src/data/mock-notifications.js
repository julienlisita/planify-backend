const mockNotifications = [
    { id: 1, type: "rappel_plat_planifie", message: "N'oubliez pas de préparer votre plat prévu pour ce soir.", isRead: false, userId: 1, created_at: "2024-12-23" },
    { id: 2, type: "reception_message_recu", message: "Vous avez reçu un nouveau message.", isRead: true, userId: 2, created_at: "2024-12-24" },
    { id: 3, type: "recette_likee", message: "Votre recette a été aimée par un utilisateur.", isRead: false, userId: 3, created_at: "2024-12-25" },
    { id: 4, type: "recette_notee", message: "Votre recette a reçu une nouvelle note.", isRead: true, userId: 4, created_at: "2024-12-26" },
    { id: 5, type: "recette_commentee", message: "Un utilisateur a laissé un commentaire sur votre recette.", isRead: false, userId: 5, created_at: "2024-12-27" },
    { id: 6, type: "message_administrateur", message: "Le site sera en maintenance demain de 2h à 4h.", isRead: true, userId: 1, created_at: "2024-12-28" },
    { id: 7, type: "information_generale", message: "Découvrez nos nouvelles fonctionnalités !", isRead: false, userId: 2, created_at: "2024-12-29" },
    { id: 8, type: "rappel_plat_planifie", message: "Votre repas pour demain est prêt à être consulté.", isRead: true, userId: 3, created_at: "2024-12-30" },
    { id: 9, type: "reception_message_recu", message: "Un utilisateur vous a envoyé un message.", isRead: false, userId: 4, created_at: "2024-12-31" },
    { id: 10, type: "recette_likee", message: "Une de vos recettes a été ajoutée aux favoris d'un utilisateur.", isRead: false, userId: 5, created_at: "2025-01-01" },
    { id: 11, type: "recette_notee", message: "Votre recette a été notée 5 étoiles !", isRead: true, userId: 1, created_at: "2025-01-02" },
    { id: 12, type: "recette_commentee", message: "Un utilisateur adore votre recette et a laissé un commentaire.", isRead: false, userId: 2, created_at: "2025-01-03" },
    { id: 13, type: "message_administrateur", message: "Le site a été mis à jour avec des améliorations majeures.", isRead: true, userId: 3, created_at: "2025-01-04" },
    { id: 14, type: "information_generale", message: "Essayez nos nouvelles catégories de recettes.", isRead: false, userId: 4, created_at: "2025-01-05" },
    { id: 15, type: "rappel_plat_planifie", message: "Préparez-vous pour votre plat préféré ce soir.", isRead: false, userId: 5, created_at: "2025-01-06" },
  ];
  
  export default mockNotifications;