import type { AttachmentSectionName } from "@types";
import { useEffect } from "react";
import { AttachmentSections } from "@atoms/attachment-sections";
import { Main } from "@atoms/main";
import { Default } from "@templates/default";
import { useInitialActions } from "@hooks/useInitialActions";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setActiveAttachmentSection, setFormSubtitle, setFormTitle } from "@redux/slice";
import { selectPageAttachmentData } from "@redux/selectors";

export const Attachment = () => {
  const { sections } = useAppSelector(selectPageAttachmentData);
  const dispatch = useAppDispatch();

  useInitialActions("attachment");

  const defineFirstSection = (sections: AttachmentSection[]): AttachmentSectionName =>
    sections.reduce(
      (result: AttachmentSectionName | null, section: AttachmentSection): AttachmentSectionName | null =>
        !section.completed && result === null ? section.name : result,
      null,
    ) || "insurance";

  useEffect(() => {
    dispatch(setFormTitle("Mandat für Bußgeld- und Strafsachen"));
    dispatch(setFormSubtitle(""));
  }, []);

  useEffect(() => {
    if (sections) {
      dispatch(setActiveAttachmentSection(defineFirstSection(sections)));
    }
  }, [sections]);

  return (
    <Default>
      <Main>
        <AttachmentSections />
      </Main>
    </Default>
  );
};
