const isAuthenticated = async (req, res, next) => {
    if (await req.oidc.isAuthenticated()) {
        // return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
}

export { isAuthenticated }; 