import { auth,requiresAuth  } from 'express-openid-connect';
import express from 'express';

const router = express.Router();
router.route("/login").get((req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    )
})

router.route("/profile").get((req,res)=>{
    res.send()
})
export default router;