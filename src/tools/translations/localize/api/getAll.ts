import { apiRequest } from "../helpers";

const getAllTranslations = () => apiRequest("assets");

export default getAllTranslations;
