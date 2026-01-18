/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  ExamRegistration,
  ExamRegistrationPresentation,
  PageResponse,
} from "@/types/items";
import { useAlertService } from "@/context/AlertServiceContext";
import { ExamRegistrationAPIService } from "@/api/examRegistrations";
import {
  toExamRegistrationPresentations,
  getAverageMark,
  getTotalESPB,
} from "@/utils/examRegistrationUtils";
import Table from "@/components/custom/Table";
import Info from "@/components/custom/Info";
import Container from "@/components/custom/Container";
import Title from "@/components/custom/Title";
import log from "loglevel";

const ExamRegistrationsPassedPage = () => {
  //#region Consts and imports
  const alertService = useAlertService();
  //#endregion Consts

  //#region useState
  const [examRegistrationsPassed, setExamRegistrationsPassed] = useState<
    ExamRegistrationPresentation[]
  >([]);
  const [
    isLoadingExamRegistrationsPassed,
    setIsLoadingExamRegistrationsPassed,
  ] = useState(true);
  const [averageMark, setAverageMark] = useState("Nema položenih ispita");
  const [totalESPB, setTotalESPB] = useState(0);
  //#endregion useState

  //#region API Functions
  const fetchExamRegistrationsPassed = async () => {
    setIsLoadingExamRegistrationsPassed(true);
    setExamRegistrationsPassed([]);
    try {
      const response: ExamRegistration[] =
        await ExamRegistrationAPIService.getPassedExamRegistrations();
      const presentations = toExamRegistrationPresentations(response);
      setExamRegistrationsPassed(presentations);
      setAverageMark(getAverageMark(presentations));
      setTotalESPB(getTotalESPB(presentations));
    } catch (error) {
      alertService.error(
        "Došlo je do greške prilikom učitavanja položenih ispita."
      );
      log.error(error);
    } finally {
      setIsLoadingExamRegistrationsPassed(false);
    }
  };
  //#endregion API Functions

  //#region Other Handlers
  //#endregion Other Handlers

  //#region OnMount
  useEffect(() => {
    fetchExamRegistrationsPassed();
  }, []);
  //#endregion OnMount

  return (
    <Container>
      <Title> Položeni ispiti</Title>
      {isLoadingExamRegistrationsPassed ? (
        <Info className="w-50">učitava se...</Info>
      ) : (
        <Table
          maxHeight="70vh"
          width="60vw"
          headers={[
            { title: "R.Br", value: "rowNum" },
            { title: "Naziv Ispita", value: "courseName" },
            { title: "Ocena", value: "mark" },
            { title: "Espb", value: "courseEspb" },
            { title: "Datum polaganja", value: "examDateFormatted" },
            { title: "Potpisao nastavnik", value: "signedByName" },
            { title: "Dodatne informacije", value: "comment" },
          ]}
          colWidths={[1, 2, 1, 1, 2, 2, 2]}
          items={examRegistrationsPassed.map((erp, key) => ({
            ...erp,
            rowNum: key + 1,
          }))}
          footer={`Prosečna ocena: ${averageMark}, Ukupno ostvareno ESPB: ${totalESPB}`}
        />
      )}
    </Container>
  );
};

export default ExamRegistrationsPassedPage;
