export const pushUserDataToOptimizely = (attributes: unknown): void => {
  window.optimizely = window.optimizely || [];
  window.optimizely.push({
    type: "user",
    attributes: attributes,
  });
};

export const pushPageDataToOptimizely = (attributes: unknown): void => {
  window.optimizely = window.optimizely || [];
  window.optimizely.push({
    type: "page",
    pageName: attributes,
  });
};

export const optimizelyAuthenticationSuccess = (data: GetAuthenticateResponse): void => {
  if (data.allowedPath === "/") {
    pushUserDataToOptimizely({
      poa_type: data.poaData ? data.poaData.latestSentPoaType : "",
      accusation: data.charge,
    });
    if (data.charge === "Strafsache" && data.poaData?.latestSentPoaType === "insurance") {
      pushPageDataToOptimizely("no_box_on_strafsachen");
    }
  }
  if (data.allowedPath === "/attachment") {
    const attachmentSections = data.attachmentSections || [];
    pushUserDataToOptimizely({
      has_rsv: !!attachmentSections.find((s: AttachmentSection) => s.name === "insurance") ? "Ja" : "Nein",
    });
  }
};
