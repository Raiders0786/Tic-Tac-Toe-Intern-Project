import Axios from "axios";

const crudCrud = Axios.create({
	baseURL: `https://crudcrud.com/api/${process.env.REACT_APP_CRUD_CRUD_API_KEY}`,
});

export default crudCrud;
