import axios from "axios";
import { Router } from "express";

const credentialRoute = Router();

credentialRoute.get('/bi/:bi', async (req, res) => {
    try {
        const { bi } = req.params;

        const { data: BIFetchData } = await axios(`https://digital.ao/ao/actions/bi.ajcall.php?bi=${bi}`);

        if (!BIFetchData || BIFetchData === undefined || BIFetchData === null) {
            return res.status(404).json({
                message: "BI not found"
            }).end();
        }

        return res.status(200).json(BIFetchData).end();
    } catch (error) {
        console.error(error)
    }
});

export default credentialRoute;
