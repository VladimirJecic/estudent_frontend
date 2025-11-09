import React, { useState } from "react";
import {
  ExamRegistrationPresentation,
  UpdateExamRegistrationSubmitRequest,
} from "@/types/items";
import TextInput from "@/components/custom/TextInput";
import TextArea from "@/components/custom/TextArea";
import CheckBox from "@/components/custom/CheckBox";
import Button from "@/components/custom/Button";
import Container from "@/components/custom/Container";

interface ExamRegistrationEditProps {
  registration: ExamRegistrationPresentation;
  onSave: (updateRequest: UpdateExamRegistrationSubmitRequest) => Promise<void>;
}

const ExamRegistrationEdit: React.FC<ExamRegistrationEditProps> = ({
  registration,
  onSave,
}) => {
  const [mark, setMark] = useState<number>(registration.mark || 5);
  const [hasAttended, setHasAttended] = useState<boolean>(
    registration.hasAttended
  );
  const [comment, setComment] = useState<string>(registration.comment || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateRequest: UpdateExamRegistrationSubmitRequest = {
        examRegistrationId: registration.id,
        mark: mark,
        hasAttended,
        comment,
      };
      await onSave(updateRequest);
    } catch (error) {
      console.error("Error saving exam registration:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container className="column align-items-start">
      {/* Display fields (read-only) */}
      <div className="row w-100">
        <div className="column col-4">
          <TextInput
            initialValue={registration.studentIndexNum}
            placeholder="Broj indexa"
            readonly
          />
        </div>
        <div className="column col-4">
          <TextInput
            initialValue={registration.studentName}
            placeholder="Ime studenta"
            readonly
          />
        </div>
        <div className="column col-4">
          <TextInput
            initialValue={registration.courseName}
            placeholder="Naziv ispita"
            readonly
          />
        </div>
      </div>
      <div className="row w-100">
        <div className="column col-4">
          <TextInput
            initialValue={registration.examDateTimeFormatted}
            placeholder="Datum i vreme ispita"
            readonly
          />
        </div>
        <div className="column col-4">
          <TextInput
            initialValue={registration.courseEspb.toString()}
            placeholder="ESPB"
            readonly
          />
        </div>
        <div className="column col-4">
          <TextInput
            initialValue={registration.signedByName}
            placeholder="Ocenio prijavu"
            readonly
          />
        </div>
      </div>

      <div className="row w-100 pt-5 ">
        <div className="column col-4">
          <TextInput
            initialValue={registration.updatedAtFormatted}
            placeholder="Poslednji put izmenio/la"
            readonly
          />
        </div>
        <div className="col-3">
          <TextInput
            type="number"
            initialValue={mark.toString()}
            onChange={(value) => setMark(Number(value))}
            defaultValue="5"
            placeholder="Ocena"
          />
        </div>
        <div className="col-2 d-flex align-items-start justify-content-center">
          <CheckBox
            label="Prisustvovao"
            checked={hasAttended}
            onChange={(checked) => setHasAttended(checked)}
          />
        </div>
      </div>

      <div className="row w-100 mt-3">
        <div className="col-12">
          <TextArea
            initialValue={comment}
            onChange={(value) => setComment(value)}
            placeholder="Dodatne informacije"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="d-flex flex-row justify-content-end w-100 mt-3 pe-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? "Čuvanje..." : "Sačuvaj izmene"}
        </Button>
      </div>
    </Container>
  );
};

export default ExamRegistrationEdit;
