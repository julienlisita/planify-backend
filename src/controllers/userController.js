export function findAllUsers(req, res, next) {
    try {
        return  res.json({ message: "Aucun utilisateur" });
    } catch (error) {
        next(error); 
    }
}
