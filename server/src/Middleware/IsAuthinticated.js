const isAuthenticated =  (req, res, next) => {
    console.log("hii inside isauthenticated" +  req.oidc.isAuthenticated());
    if (req.oidc.isAuthenticated()) {
        next();
    }
    else
    return res.status(401).json({ message: 'Unauthorized' });
}

export { isAuthenticated }; 