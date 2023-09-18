import React from 'react';
import {useTemplateDataGrid} from "./hook/useTemplateDataGrid";
import {Route, Routes} from "react-router-dom";
import {AuthLoader} from "./component/main/AuthLoader";
import {MainTemplate} from "./component/template/MainTemplate";
import {Users} from "./pages/Users";
import {PLC} from "./pages/PLC";
import {References} from "./pages/References";
import {Recipes} from "./pages/Recipes";
import {RecipesGraph} from "./pages/RecipesGraph";
import {Operations} from "./pages/Operations";
import {Parts} from "./pages/Parts";
import {TagResults} from "./pages/TagResults";
import {OperationsResults} from "./pages/OperationResults";
import {observer} from "mobx-react-lite";
import {Graphs} from "./pages/Graphs";
import {Login} from "./pages/Login";
import {PrivateRoute} from "./component/main/PrivateRoute";

export const App = observer(() => {
    const mainPropsUsers = useTemplateDataGrid("/users");
    const mainPropsReference = useTemplateDataGrid("/reference");
    const mainPropsOperations = useTemplateDataGrid("/operations");
    const mainPropsParts = useTemplateDataGrid("/parts");

    return (
        <Routes>
            <Route path="/auth" element={<Login />} />
            <Route element={<AuthLoader />}>
                <Route path="/" element={<MainTemplate />} >
                    <Route index element={<Parts key={"parts"} mainProps={mainPropsParts}/>} />
                    <Route path="/reference" element={<References key={"reference"} mainProps={mainPropsReference} />} />
                    <Route path="/tags" element={<Recipes key={"tags"} />} />
                    <Route path="/recipe_graph_moment"
                           element={<RecipesGraph
                               keyQuery={"recipeGraphMomentDataGrid"}
                               key={"recipe_graph_moment"}
                               nameGraph={"moment"}/>}
                    />
                    <Route path="/recipe_graph_pressure"
                           element={<RecipesGraph
                               keyQuery={"recipeGraphPressureDataGrid"}
                               key={"recipe_graph_pressure"}
                               nameGraph={"pressure"}
                           />}
                    />
                    <Route path="/tag_results" element={<TagResults key={"tag_results"} />} />
                    <Route path="/operations" element={<Operations key={"operations"} mainProps={mainPropsOperations}/>} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/users" element={<Users key={"users"} mainProps={mainPropsUsers}/>} />
                        <Route path="/plc" element={<PLC key={"plc"} />} />
                    </Route>
                </Route>
                <Route path="/operations_results" element={<OperationsResults key={"operationResults"} />} />
                <Route path="/graph_effort" element={<Graphs key={"graphRealEffort"} />} />
            </Route>
        </Routes>
    );
})