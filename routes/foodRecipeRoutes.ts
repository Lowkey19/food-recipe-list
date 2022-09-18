import { Request, Response, Express } from 'express';
import fs from 'fs';
import path from 'path';

import { isAuth } from '../middleware/authMiddleware';
import { uploadImage } from '../middleware/multerMiddleware';
import FoodRecipe from '../models/foodRecipe';

const getImageUri = (imagePath: string) => {
  return `http://localhost:${process.env.PORT}/uploads/${path.basename(imagePath)}`;
};

const routes = (app: Express) => {
  app.get('/foodrecipe', async (req: Request, res: Response) => {
    try {
      let allFoodRecipes = await FoodRecipe.find({}).exec();
      allFoodRecipes.forEach((f) => {
        if (f.imagePath) f.imagePath = getImageUri(f.imagePath);
      })
      res.status(200).send(allFoodRecipes);
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error getting Food recipes data",
      })
    }
  });

  app.get('/foodrecipe/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      let foodRecipe = await FoodRecipe.findById(id).exec();
      if (!foodRecipe) {
        res.status(404).json({
          "error": "NotFoundError",
          "message": "Food recipe not found.",
        })
      }
      if (foodRecipe?.imagePath) foodRecipe.imagePath = getImageUri(foodRecipe.imagePath);
      res.status(200).send(foodRecipe);
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error getting Food recipes data",
      })
    }
  });

  app.get('/foodrecipe/search/:name', async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      let foodRecipe = await FoodRecipe.find({ 'name' : {'$regex': name, '$options': 'i'}}).exec();
      foodRecipe.forEach((f) => {
        if (f.imagePath) f.imagePath = getImageUri(f.imagePath);
      })
      if (!foodRecipe) {
        res.status(404).json({
          "error": "NotFoundError",
          "message": "Food recipe not found.",
        })
      }
      res.status(200).send(foodRecipe);
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error getting Food recipes data",
      })
    }
  });

  app.post('/foodrecipe/create', isAuth, uploadImage.single('foodImg'), async (req: Request, res: Response) => {
    let imagePath = '';
    let imageFilename = '';

    const { name, description, ingredients, procedure, isLiked } = JSON.parse(req.body.foodRecipe);

    if (req.file) {
      imagePath = req.file.path;
      imageFilename = req.file.originalname;
    }

    const newFoodRecipe = req.file ?
      new FoodRecipe({
        name,
        description,
        ingredients,
        procedure,
        isLiked,
        imagePath,
        imageFilename,
      }) :
      new FoodRecipe({
        name,
        description,
        ingredients,
        procedure,
        isLiked,
      });

    try {
      await newFoodRecipe.save();

      res.status(200).json({
        message: "Food recipe Data successfully created",
      })
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error creating Food recipe data",
      })
    }
  });

  app.patch('/foodrecipe/:id', isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;
    const { updatedFoodRecipe } = req.body;

    try {
      await FoodRecipe.findByIdAndUpdate(id, updatedFoodRecipe).exec();

      res.status(200).json({
        message: 'Food recipe data successfully updated',
      });
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error updating Food recipe data",
      })
    }
  });

  app.delete('/foodrecipe/:id', isAuth, async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const foodRecipe = await FoodRecipe.findById(id).exec();

      if (foodRecipe?.imagePath && fs.existsSync(foodRecipe.imagePath)) {
        fs.unlinkSync(foodRecipe.imagePath);
      }

      await FoodRecipe.findByIdAndDelete(id).exec();

      res.status(200).json({
        message: 'Food recipe data successfully deleted',
      });
    } catch (e) {
      res.status(400).json({
        "error": e,
        "message": "Error deleting Food recipe data",
      })
    }
  });
}

export default routes;
