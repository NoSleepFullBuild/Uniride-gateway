import exp from "constants";

// Middleware pour vérifier si l'utilisateur est un admin
export async function isAdmin(role: string) {
    
    if (role === "admin") {
        return true;
    } else {
        return false;
    }
    
}

export async function isUser(userId: number, authentification: any) {
        
    if(authentification.id === userId) {
        return true;
    }
}
  