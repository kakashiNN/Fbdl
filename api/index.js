import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const form = new FormData();
    form.append("url", url);

    const response = await axios.post("https://snapsave.app/action.php?lang=en", form, {
      headers: {
        ...form.getHeaders(),
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        origin: "https://snapsave.app",
        referer: "https://snapsave.app/"
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
