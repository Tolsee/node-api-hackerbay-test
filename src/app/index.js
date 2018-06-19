import express from 'express';
import bodyParser from 'body-parser';

const App = express();
const Router = express.Router();

const homeHandler = (req, res) => {
  res.json({
    status: 'success'
  });
};

const dataPostData
Router.get('/', homeHandler);
// Router.get('/data', dataHandler);

export default App.use(Router);