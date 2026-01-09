/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import {
  CourseExam,
  ExamRegistration,
  ExamRegistrationPresentation,
  CourseExamPresentation,
  SubmitExamRegistration,
  PageResponse,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import { toExamRegistrationPresentations } from "@/utils/examRegistrationUtils";
import Button from "@/components/custom/Button";
import Table from "@/components/custom/Table";
import Info from "@/components/custom/Info";
import Title from "@/components/custom/Title";
import Container from "@/components/custom/Container";
import log from "loglevel";

const ExamRegistrationsActionsPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  //#endregion Consts

  //#region useState
  const [
    courseExamRegistrationCandidates,
    setCourseExamRegistrationCandidates,
  ] = useState<CourseExamPresentation[]>([]);
  const [currentExamRegistrations, setCurrentExamRegistrations] = useState<
    ExamRegistrationPresentation[]
  >([]);
  const [
    isLoadingExamRegistrationCandidates,
    setIsLoadingExamRegistrationCandidates,
  ] = useState(true);
  const [
    isLoadingExamRegistrationsExisting,
    setIsLoadingCurrentExamRegistrations,
  ] = useState(true);
  //#endregion useState

  //#region API Functions
  const fetchCourseExamRegistrationCandidates = async () => {
    setIsLoadingExamRegistrationCandidates(true);
    setCourseExamRegistrationCandidates([]);
    try {
      const courseExams: CourseExam[] =
        await ExamRegistrationAPIService.fetchCourseExamRegistrationCandidates();
      setCourseExamRegistrationCandidates(
        toCourseExamPresentations(courseExams)
      );
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja ispita koji se mogu prijaviti."
      );
      log.error(error);
    } finally {
      setIsLoadingExamRegistrationCandidates(false);
    }
  };

  const fetchCurrentExamRegistrations = async () => {
    setIsLoadingCurrentExamRegistrations(true);
    setCurrentExamRegistrations([]);
    try {
      const response: ExamRegistration[] =
        await ExamRegistrationAPIService.fetchCurrentExamRegistrations();
      setCurrentExamRegistrations(toExamRegistrationPresentations(response));
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja prijavljenih ispita."
      );
      log.error(error);
    } finally {
      setIsLoadingCurrentExamRegistrations(false);
    }
  };

  const saveExamRegistration = async (courseExam: CourseExam) => {
    try {
      const dto: SubmitExamRegistration = { courseExamId: courseExam.id };
      await ExamRegistrationAPIService.createExamRegistration(dto);
      alertService.alert("Ispit je uspešno prijavljen.");
      await setupView();
    } catch (error) {
      alertService.error("Neuspešna prijava ispita.");
      log.error(error);
    }
  };

  const deleteExamRegistration = async (
    examRegistration: ExamRegistrationPresentation
  ) => {
    try {
      await ExamRegistrationAPIService.deleteExamRegistration(
        examRegistration.id
      );
      alertService.alert("Ispit je uspešno odjavljen.");
      await setupView();
    } catch (error) {
      alertService.error("Greška prilikom brisanja ispita.");
      log.error(error);
    }
  };
  //#endregion API Functions

  //#region Other Handlers
  const setupView = async () => {
    await Promise.all([
      fetchCourseExamRegistrationCandidates(),
      fetchCurrentExamRegistrations(),
    ]);
  };

  const canSubmitAnyExamRegistration = () =>
    courseExamRegistrationCandidates.length > 0;
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    setupView();
  }, []);
  //#endregion OnMount

  return (
    <Container>
      <Title>Ispiti koje mogu da prijavim</Title>

      {/* First conditional block: exam registration candidates */}
      {isLoadingExamRegistrationCandidates ? (
        <Info className="w-50">učitava se...</Info>
      ) : !canSubmitAnyExamRegistration() ? (
        <Info className="w-50">Nema ispita za prijavu</Info>
      ) : (
        <Table
          width="50vw"
          headers={[
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Espb", value: "courseEspb" },
            { title: "Vreme polaganja", value: "examDateTimeFormatted" },
            { title: "Prijavi", value: "actions" },
          ]}
          colWidths={[2, 1, 2, 1]}
          items={courseExamRegistrationCandidates}
          templates={{
            actions: (courseExamRegistrationCandidate) => (
              <Button
                onClick={() =>
                  saveExamRegistration(courseExamRegistrationCandidate)
                }
                disabled={
                  !courseExamRegistrationCandidate.isRegistrationInProgress
                }
                tooltip={
                  !courseExamRegistrationCandidate.isRegistrationInProgress
                    ? "Period za prijavu je istekao"
                    : undefined
                }
                icon="fa fa-plus"
              />
            ),
          }}
        />
      )}

      <Title className="text-decoration-underline fs-2 mt-4 mb-2">
        Prijavljeni ispiti
      </Title>

      {/* Second conditional block: existing exam registrations */}
      {isLoadingExamRegistrationsExisting ? (
        <Info className="w-50">učitava se...</Info>
      ) : currentExamRegistrations.length === 0 ? (
        <Info className="w-50">Nema prijavljenih ispita</Info>
      ) : (
        <Table
          width="50vw"
          headers={[
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Espb", value: "courseEspb" },
            { title: "Vreme polaganja", value: "examDateTimeFormatted" },
            { title: "Odjavi", value: "deleteExamRegistration" },
          ]}
          items={currentExamRegistrations}
          colWidths={[2, 1, 2, 1]}
          templates={{
            deleteExamRegistration: (examRegistration) => (
              <Button
                onClick={() => deleteExamRegistration(examRegistration)}
                disabled={!examRegistration.isRegistrationInProgress}
                tooltip={
                  !examRegistration.isRegistrationInProgress
                    ? "Period za odjavu je istekao"
                    : undefined
                }
                icon="fa fa-minus"
              />
            ),
          }}
        />
      )}
    </Container>
  );
};

export default ExamRegistrationsActionsPage;
