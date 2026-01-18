/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useAlertService } from "@/context/AlertServiceContext";
import { ExamPeriodAPIService } from "@/api/examPeriods";
import { CourseExamAPIService } from "@/api/courseExams";
import {
  ExamPeriod,
  ExamPeriodPresentation,
  CourseExamPresentation,
} from "@/types/items";
import { toExamPeriodPresentations } from "@/utils/examPeriodUtils";
import { toCourseExamPresentations } from "@/utils/courseExamUtils";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import Info from "@/components/custom/Info";
import Table from "@/components/custom/Table";
import Button from "@/components/custom/Button";
import log from "loglevel";

const ExamPeriodsPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  const { user } = useUser();
  //#endregion Consts

  //#region useState
  const [examPeriods, setExamPeriods] = useState<ExamPeriodPresentation[]>([]);
  const [allCourseExams, setAllCourseExams] = useState<
    CourseExamPresentation[]
  >([]);
  const [remainingCourseExams, setRemainingCourseExams] = useState<
    CourseExamPresentation[]
  >([]);
  const [selectedExamPeriod, setSelectedExamPeriod] =
    useState<ExamPeriodPresentation | null>(null);
  const [isLoadingExamPeriods, setIsLoadingExamPeriods] = useState(true);
  const [isAllCourseExamsVisible, setIsAllCourseExamsVisible] = useState(false);
  const [isRemainingCourseExamsVisible, setIsRemainingCourseExamsVisible] =
    useState(false);
  //#endregion useState

  //#region API Functions
  const fetchActiveExamPeriods = async () => {
    setIsLoadingExamPeriods(true);
    try {
      const periods = await ExamPeriodAPIService.getActiveExamPeriods();
      setExamPeriods(toExamPeriodPresentations(periods));
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja aktuelnih rokova."
      );
      log.error(error);
    } finally {
      setIsLoadingExamPeriods(false);
    }
  };

  const fetchRemainingCourseExams = async (examPeriod: ExamPeriod) => {
    try {
      const courseExams = await CourseExamAPIService.getRemainingCourseExams(
        examPeriod
      );
      setRemainingCourseExams(toCourseExamPresentations(courseExams));
    } catch (error) {
      alertService.error("Došlo je do greške prilikom obrade zahteva.");
      log.error(error);
    }
  };
  //#endregion API Functions

  //#region Other Handlers
  const showAllCourseExams = (examPeriod: ExamPeriodPresentation) => {
    setSelectedExamPeriod(examPeriod);
    setAllCourseExams(examPeriod.courseExamPresentations);
    setIsAllCourseExamsVisible(true);
    setIsRemainingCourseExamsVisible(false);
  };

  const showRemainingCourseExams = async (
    examPeriod: ExamPeriodPresentation
  ) => {
    setSelectedExamPeriod(examPeriod);
    await fetchRemainingCourseExams(examPeriod);
    setIsRemainingCourseExamsVisible(true);
    setIsAllCourseExamsVisible(false);
  };
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    fetchActiveExamPeriods();
  }, []);
  //#endregion OnMount

  return (
    <Container>
      <Title>Rokovi</Title>
      {examPeriods.length === 0 && isLoadingExamPeriods ? (
        <Info className="w-50">učitava se...</Info>
      ) : (
        <Table
          width="70vw"
          className="mb-5"
          colWidths={[2, 1, 1, 1, 1, 1]}
          headers={[
            { title: "Rok", value: "name" },
            { title: "Prijava od", value: "dateRegistrationStartFormatted" },
            { title: "Prijava do", value: "dateRegistrationEndFormatted" },
            { title: "Datum početka", value: "dateStartFormatted" },
            { title: "Datum završetka", value: "dateEndFormatted" },
            { title: "Ispiti", value: "actions" },
          ]}
          items={examPeriods}
          templates={{
            actions: (rok) => (
              <div className="d-flex flex-row gap-2">
                {!user?.isAdmin && (
                  <Button
                    className="fs-6"
                    onClick={() => showRemainingCourseExams(rok)}
                  >
                    moji
                  </Button>
                )}
                <Button
                  className="fs-6"
                  onClick={() => showAllCourseExams(rok)}
                >
                  svi
                </Button>
              </div>
            ),
          }}
        />
      )}
      {isAllCourseExamsVisible && (
        <>
          <Title>Svi Ispiti za {selectedExamPeriod?.name}</Title>
          <Table
            width="70vw"
            colWidths={[3, 2, 1, 2, 1]}
            headers={[
              { title: "Predmet", value: "courseName" },
              { title: "Semestar", value: "courseSemester" },
              { title: "Espb", value: "courseEspb" },
              { title: "Vreme Polaganja", value: "examDateTimeFormatted" },
              { title: "Sala", value: "hall" },
            ]}
            items={allCourseExams}
          />
        </>
      )}
      {isRemainingCourseExamsVisible && (
        <>
          <Title>Moji Ispiti za {selectedExamPeriod?.name}</Title>
          <Table
            width="70vw"
            colWidths={[3, 2, 1, 2, 1]}
            headers={[
              { title: "Predmet", value: "courseName" },
              { title: "Semestar", value: "courseSemester" },
              { title: "Espb", value: "courseEspb" },
              { title: "Vreme Polaganja", value: "examDateTimeFormatted" },
              { title: "Sala", value: "hall" },
            ]}
            items={remainingCourseExams}
          />
        </>
      )}
    </Container>
  );
};

export default ExamPeriodsPage;
