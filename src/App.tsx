import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AuthLoader} from "./component/main/AuthLoader";
import {MainTemplate} from "./component/template/MainTemplate";
import {observer} from "mobx-react-lite";
import {PrivateRoute} from "./component/main/PrivateRoute";
import {Loading} from "./component/main/Loading";

export const App = observer(() => {
    const Parts = React.lazy(() => import("./pages/Parts"));
    const Login = React.lazy(() => import("./pages/Login"));
    const References = React.lazy(() => import("./pages/References"));
    const Recipes = React.lazy(() => import("./pages/Recipes"));
    const RecipesMoment = React.lazy(() => import("./pages/RecipesMoment"));
    const RecipesPressure = React.lazy(() => import("./pages/RecipesPressure"));
    const TagResults = React.lazy(() => import("./pages/TagResults"));
    const Users = React.lazy(() => import("./pages/Users"));
    const PLC = React.lazy(() => import("./pages/PLC"));
    const Operations = React.lazy(() => import("./pages/Operations"));
    const OperationsResults = React.lazy(() => import("./pages/OperationResults"));
    const Graphs = React.lazy(() => import("./pages/Graphs"));

    return (
        <Routes>
            <Route path="/auth" element={<Suspense fallback={<Loading />}> <Login /> </Suspense>} />
            <Route element={<AuthLoader />}>
                <Route path="/" element={<MainTemplate />} >
                    <Route index element={<Suspense fallback={<Loading />}> <Parts key={"parts"} /> </Suspense>} />
                    <Route path="/reference"
                           element={
                        <Suspense fallback={<Loading />}>
                               <References key={"reference"} />
                        </Suspense>} />
                    <Route path="/tags" element={
                        <Suspense fallback={<Loading /> }>
                            <Recipes key={"tags"} />
                        </Suspense>} />
                    <Route path="/recipe_graph_moment"
                           element={
                        <Suspense fallback={<Loading />}>
                            <RecipesMoment key={"recipe_graph_moment_main"}/>
                        </Suspense>}
                                />
                    <Route path="/recipe_graph_pressure"
                           element={
                        <Suspense fallback={<Loading />}>
                            <RecipesPressure key={"recipe_graph_pressure_main"}/>
                        </Suspense>}
                    />
                    <Route path="/tag_results" element={
                        <Suspense fallback={<Loading />}>
                            <TagResults key={"tag_results"} />
                        </Suspense>} />
                    <Route path="/operations" element={
                        <Suspense fallback={<Loading />}>
                            <Operations key={"operations"} />
                        </Suspense>} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/users" element={
                            <Suspense fallback={<Loading />}>
                                <Users key={"users"} />
                            </Suspense>} />
                        <Route path="/plc" element={
                            <Suspense fallback={<Loading />}>
                                <PLC key={"plc"} />
                            </Suspense>} />
                    </Route>
                    </Route>
                    <Route path="/operations_results" element={
                        <Suspense fallback={<Loading />}>
                            <OperationsResults key={"operationResults"} />
                        </Suspense>} />
                <Route path="/graph_effort" element={
                    <Suspense fallback={<Loading />}>
                        <Graphs key={"graphRealEffort"} />
                    </Suspense>}  />
                </Route>
        </Routes>
    );
})