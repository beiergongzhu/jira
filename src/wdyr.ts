/// <reference types="@welldone-software/why-did-you-render" />

// 该库用于找出页面渲染的原因
import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
