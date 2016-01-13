docker run -d -=name mealplanner_db_1 mongo:latest
docker run -d -v //c/Users/thull/docker/meal-planner/api/server:/home/mean/server --link mealplanner_db_1 --name mealplanner_api_1 -t mealplanner_api
docker run -d -v //c/Users/thull/docker/meal-planner/front/app:/home/mean/app --link mealplanner_db_1 --name mealplanner_front_1 -t mealplanner_front