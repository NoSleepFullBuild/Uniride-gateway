import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    const start = process.hrtime();
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const responseTime = diff[0] * 1e3 + diff[1] * 1e-6; // Convertir en millisecondes
        console.log(`${req.method} ${req.path} ${res.statusCode} - ${responseTime.toFixed(3)}ms`);
    });
    next();
}
