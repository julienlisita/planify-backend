const mockMessages = [
    { id: 1, content: "Salut, comment ça va ?", isRead: false, senderId: 1, receiverId: 2, created_at: "2024-12-23" },
    { id: 2, content: "Tu as vu la dernière recette ?", isRead: true, senderId: 2, receiverId: 1, created_at: "2024-12-24" },
    { id: 3, content: "Merci pour ton aide !", isRead: false, senderId: 3, receiverId: 4, created_at: "2024-12-25" },
    { id: 4, content: "Cette recette est incroyable !", isRead: true, senderId: 4, receiverId: 3, created_at: "2024-12-26" },
    { id: 5, content: "Je vais essayer ça ce soir.", isRead: false, senderId: 5, receiverId: 1, created_at: "2024-12-27" },
    { id: 6, content: "Est-ce que tu peux m'envoyer la liste des ingrédients ?", isRead: true, senderId: 1, receiverId: 5, created_at: "2024-12-28" },
    { id: 7, content: "Pas de problème, je t'envoie ça tout de suite.", isRead: false, senderId: 2, receiverId: 4, created_at: "2024-12-29" },
    { id: 8, content: "On se voit quand pour cuisiner ensemble ?", isRead: false, senderId: 3, receiverId: 1, created_at: "2024-12-30" },
    { id: 9, content: "J'ai une nouvelle idée de recette !", isRead: true, senderId: 4, receiverId: 5, created_at: "2024-12-31" },
    { id: 10, content: "Bonne année ! Quelles sont tes résolutions ?", isRead: false, senderId: 5, receiverId: 3, created_at: "2025-01-01" },
    { id: 11, content: "J'adore la recette de ce matin, merci !", isRead: true, senderId: 1, receiverId: 4, created_at: "2025-01-02" },
    { id: 12, content: "Est-ce que tu as besoin d'aide pour ta liste de courses ?", isRead: false, senderId: 2, receiverId: 3, created_at: "2025-01-03" },
    { id: 13, content: "Merci, c'était vraiment délicieux.", isRead: true, senderId: 3, receiverId: 2, created_at: "2025-01-04" },
    { id: 14, content: "Tu veux venir dîner ce soir ?", isRead: false, senderId: 4, receiverId: 1, created_at: "2025-01-05" },
    { id: 15, content: "Bien sûr, à quelle heure ?", isRead: true, senderId: 5, receiverId: 4, created_at: "2025-01-06" },
    { id: 16, content: "Je pense que cette recette manque d'épices.", isRead: false, senderId: 1, receiverId: 3, created_at: "2025-01-07" },
    { id: 17, content: "As-tu essayé avec du curry ?", isRead: true, senderId: 2, receiverId: 5, created_at: "2025-01-08" },
    { id: 18, content: "Pas encore, mais c'est une bonne idée !", isRead: false, senderId: 3, receiverId: 2, created_at: "2025-01-09" },
    { id: 19, content: "Super, tu me diras ce que tu en penses.", isRead: true, senderId: 4, receiverId: 1, created_at: "2025-01-10" },
    { id: 20, content: "Merci pour ton conseil, c'était parfait.", isRead: false, senderId: 5, receiverId: 2, created_at: "2025-01-11" },
  ];
  
  export default mockMessages;