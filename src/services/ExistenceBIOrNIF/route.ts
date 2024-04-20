import fetch from "node-fetch";
import { Router } from "express";

const getCredentialRoute = Router();

getCredentialRoute.get("/bi/:bi", async (req, res) => {
  try {
    const { bi } = req.params;

    const response = await fetch(
      `https://digital.ao/ao/actions/bi.ajcall.php?bi=${bi}`
    );
    const { success, data, error } = (await response.json()) as {
      success: boolean;
      data: object;
      error: {
        code: number;
        message: string;
      };
    };

    if (!success && error) {
      return res
        .status(404)
        .json({
          message: error.message,
        })
        .end();
    }

    return res.status(202).json(data).end();
  } catch (error) {
    console.error(error);
  }
});

export default getCredentialRoute;
