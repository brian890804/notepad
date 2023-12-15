import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { page_over_duration } from "../../constants";
import { Route, Switch, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page404 from "../404page/Page404";
import useMediaSetting from "../../reackHook/useMediaSetting";

const SwitchRoute = ({
  location,
  locationPath,
  routes,
  action,
  redirect,
  containerRef,
  exact = false,
}) => {
  const { isMobile } = useMediaSetting();
  return (
    <TransitionGroup
      className={"router-wrapper"}
      childFactory={(child) =>
        React.cloneElement(child, { classNames: action })
      }
    >
      <CSSTransition
        timeout={page_over_duration}
        key={isMobile && locationPath}
      >
        <Switch location={location}>
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                render={(props) => (
                  <route.component
                    {...props}
                    routes={route.routes}
                    containerRef={containerRef}
                  />
                )}
                exact={exact}
              />
            );
          })}
          {redirect ? <Redirect to={{ pathname: redirect }} /> : ""}
          <Route path="/" render={(props) => <Page404 />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

const SwitchRouteStateToProps = (state, ownProps) => {
  let locationPath = state.router.location.pathname || "";
  locationPath = locationPath.split("/");
  let path = locationPath[ownProps.routesStep] || "";
  path = String(path) + (locationPath[ownProps.routesStepTwo] || "");
  return {
    containerRef: ownProps.containerRef,
    location: state.router.location,
    locationPath: path,
    action: state.router.action,
    routes: ownProps.routes,
    redirect: ownProps.redirect,
    // routesStep: ownProps.routesStep
  };
};

const SwitchRouteDispatchToProps = () => {
  return {};
};

SwitchRoute.propTypes = {
  location: PropTypes.object.isRequired,
  locationPath: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  redirect: PropTypes.string,
};

export default connect(
  SwitchRouteStateToProps,
  SwitchRouteDispatchToProps
)(SwitchRoute);
