import {Location} from "react-router-dom";

export class GetPageName {
    public static getPageName(location: Location): string {
        switch (location.pathname) {
            case "/":
                return "Рулевые механизмы";
            case "/users":
                return "Управление пользователями"
            case "/plc":
                return "Параметры соединения с PLC"
            case "/reference":
                return "Управления типами";
            case "/tags":
                return "Теги для передачи в контроллер (рецепты)";
            case "/tag_results":
                return "Теги для сохранения";
            case "/recipe_graph_moment":
                return "Шаблон графика момента";
            case "/operations":
                return "Результаты циклов";
            case "/recipe_graph_pressure":
                return "Шаблон графика давления";
            default:
                return "Рулевые системы";
        }
    }
}
