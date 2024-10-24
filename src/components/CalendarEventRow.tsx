import { MouseEventHandler, useCallback, useMemo } from "react";
import { useModal } from "react-modal-hook";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import Button from "./Button";
import TimeSpan from "./TimeSpan";

import type { CalendarEvent } from "../types";
import DeleteCalendarEventModal from "../modals/DeleteCalendarEventModal";
import {
  CalendarDate,
  CalendarRowContainer,
} from "./atoms/CalendarEventRowAtoms";
import { isToday } from "../util/date";

const locales = navigator.languages;

export default function CalendarEventRow({
  event,
  onEditClick,
}: {
  event: CalendarEvent;
  onEditClick?: MouseEventHandler;
}) {
  const today = useMemo(() => isToday(new Date(event.start)), [event.start]);

  const [showDeleteCalendarEventModal, closeDeleteCalendarEventModal] =
    useModal(() => (
      <DeleteCalendarEventModal
        event={event}
        onClose={closeDeleteCalendarEventModal}
      />
    ));

  const handleDeleteClick = useCallback(() => {
    showDeleteCalendarEventModal();
  }, [showDeleteCalendarEventModal]);

  return (
    <CalendarRowContainer>
      <CalendarDate today={today}>
        <div
          style={{
            lineHeight: 1,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {new Date(event.start).toLocaleDateString(locales, {
            weekday: "short",
          })}
        </div>
        <div style={{ lineHeight: 1, fontSize: 28, fontWeight: 700 }}>
          {new Date(event.start).getDate()}
        </div>
      </CalendarDate>

      <div
        style={{
          gridArea: "time",

          display: "flex",
          alignItems: "center",
        }}
      >
        <TimeSpan start={new Date(event.start)} end={new Date(event.end)} />
      </div>

      <div
        style={{
          gridArea: "detail",

          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: "hsl(0 0% 70%)" }}>
          {event.description}
        </div>
      </div>

      <div
        style={{
          gridArea: "edit",
          alignSelf: "start",
          padding: 8,
          display: "flex",
          gap: 4,
        }}
      >
        <Button onClick={onEditClick} title="Create calendar event">
          <IconPencil size="1em" />
        </Button>
        <Button onClick={handleDeleteClick} title="Delete calendar event">
          <IconTrash size="1em" />
        </Button>
      </div>
    </CalendarRowContainer>
  );
}
