import { useState, useEffect } from "react";
import ErrorModal from "./ErrorModal";
import "./Gestioncitas.css";

const daysOfWeek = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

type AvailabilityType = {
  [key: string]: string;
};

const Gestioncitas = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(20);
  const [endMinute, setEndMinute] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityType>({});
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [monthStartDay, setMonthStartDay] = useState(0);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [todayDate, setTodayDate] = useState(new Date().getDate());
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    updateMonthData(new Date().getMonth(), new Date().getFullYear());
  }, []);

  const updateMonthData = (month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    setMonthStartDay((firstDayOfMonth.getDay() + 6) % 7);
    setDaysInMonth(new Date(year, month + 1, 0).getDate());

    if (month === new Date().getMonth()) {
      setTodayDate(new Date().getDate());
    } else {
      setTodayDate(1);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonthIndex = parseInt(e.target.value);
    setCurrentMonthIndex(newMonthIndex);
    updateMonthData(newMonthIndex, new Date().getFullYear());
    setSelectedDate(null);
    setSelectedDays([]);
  };

  const handleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    setSelectedDate(null);
  };

  const handleDateClick = (date: number) => {
    if (date >= todayDate || currentMonthIndex > new Date().getMonth()) {
      setSelectedDate((prev) =>
        prev === date.toString() ? null : date.toString()
      );
      setSelectedDays([]);
    }
  };

  const handleAddInterval = () => {
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (startTime >= endTime) {
      setErrorMessage("La hora de inicio debe ser menor que la hora de fin.");
      setShowError(true);
      return;
    }

    if (selectedDays.length === 0 && !selectedDate) {
      setErrorMessage("Selecciona al menos un día o seleccione una fecha.");
      setShowError(true);
      return;
    }

    const interval = `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    // Aquí vamos a construir el array de objetos
    const availabilityData: Array<{
      horaInicio: string;
      horaFin: string;
      date: string;
      mes: string;
    }> = [];

    // Si se seleccionó una fecha
    if (selectedDate) {
      const formattedDate = new Date(selectedDate);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Asegúrate de que el mes esté en formato de dos dígitos
      const day = formattedDate.getDate().toString().padStart(2, "0");

      const formattedFullDate = `${year}-${month}-${day}`; // Formato año-mes-día

      availabilityData.push({
        horaInicio: `${startHour}:${startMinute.toString().padStart(2, "0")}`,
        horaFin: `${endHour}:${endMinute.toString().padStart(2, "0")}`,
        date: formattedFullDate, // Fecha con formato completo
        mes: monthNames[currentMonthIndex],
      });
    } else {
      // Si se seleccionaron días
      selectedDays.forEach((day) => {
        for (let i = todayDate; i <= daysInMonth; i++) {
          const date = new Date(new Date().getFullYear(), currentMonthIndex, i);
          if (date.getDay() === (daysOfWeek.indexOf(day) + 1) % 7) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Asegúrate de que el mes esté en formato de dos dígitos
            const dayString = i.toString().padStart(2, "0");

            const fullDate = `${year}-${month}-${dayString}`; // Formato año-mes-día

            availabilityData.push({
              horaInicio: `${startHour}:${startMinute
                .toString()
                .padStart(2, "0")}`,
              horaFin: `${endHour}:${endMinute.toString().padStart(2, "0")}`,
              date: fullDate, // Fecha con formato completo
              mes: monthNames[currentMonthIndex],
            });
          }
        }
      });
    }

    // Mostrar el array de objetos en la consola
    const horarioData = {
      id_nutritionist: "agregadoPorProvider",
      horario: availabilityData,
    };
    console.log(horarioData);

    // Actualizar la disponibilidad en el estado
    setAvailability((prev) => {
      const newAvailability = { ...prev };

      if (selectedDate) {
        newAvailability[selectedDate] = interval;
      } else {
        selectedDays.forEach((day) => {
          for (let i = todayDate; i <= daysInMonth; i++) {
            const date = new Date(
              new Date().getFullYear(),
              currentMonthIndex,
              i
            );
            if (date.getDay() === (daysOfWeek.indexOf(day) + 1) % 7) {
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, "0");
              const dayString = i.toString().padStart(2, "0");

              const fullDate = `${year}-${month}-${dayString}`;
              newAvailability[fullDate] = interval; // Usar la fecha completa
            }
          }
        });
      }

      return newAvailability;
    });
  };

  const handleDeleteInterval = () => {
    if (selectedDays.length === 0 && !selectedDate) {
      setErrorMessage("Selecciona un día o una fecha para eliminar.");
      setShowError(true);
      return;
    }

    setAvailability((prev) => {
      const newAvailability = { ...prev };

      const formatDate = (day: number) => {
        // Construir la fecha con formato "año-mes-día"
        const date = new Date(new Date().getFullYear(), currentMonthIndex, day);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Asegura que el mes tenga dos dígitos
        const dayOfMonth = day.toString().padStart(2, "0"); // Asegura que el día tenga dos dígitos
        return `${year}-${month}-${dayOfMonth}`;
      };

      if (selectedDate) {
        // CON EL ID OBTENIDO ENVIARLO JUNTO AL ID DEL NUTRICIONISTA MANDARLO PARA ELIMINARLO
        // Construir el objeto de información con la estructura de "horario"
        const logData = {
          id_nutritionist: "agregadoPorProvider",
          horario: {
            horaInicio:
              newAvailability[selectedDate]?.split(" - ")[0] || "No definida",
            horaFin:
              newAvailability[selectedDate]?.split(" - ")[1] || "No definida",
            date: formatDate(parseInt(selectedDate)), // Formato "año-mes-día"
            mes: monthNames[currentMonthIndex],
          },
        };
        console.log("Datos eliminados:", logData);

        // Eliminar la fecha seleccionada
        delete newAvailability[selectedDate];
      } else {
        selectedDays.forEach((day) => {
          for (let i = todayDate; i <= daysInMonth; i++) {
            const date = new Date(
              new Date().getFullYear(),
              currentMonthIndex,
              i
            );
            if (date.getDay() === (daysOfWeek.indexOf(day) + 1) % 7) {
              const dayKey = i.toString();
              if (newAvailability[dayKey]) {
                // Construir el objeto de información con la estructura de "horario"
                const logData = {
                  horario: {
                    horaInicio:
                      newAvailability[dayKey]?.split(" - ")[0] || "No definida",
                    horaFin:
                      newAvailability[dayKey]?.split(" - ")[1] || "No definida",
                    date: formatDate(i), // Formato "año-mes-día"
                    mes: monthNames[currentMonthIndex],
                  },
                };
                console.log("Datos eliminados:", logData);

                // Eliminar el intervalo
                delete newAvailability[dayKey];
              }
            }
          }
        });
      }
      return newAvailability;
    });

    setSelectedDate(null);
    setSelectedDays([]);
  };

  // Calculate the number of rows required to display all days of the month
  const rowsNeeded = Math.ceil((daysInMonth + monthStartDay) / 7);

  return (
    <div className="gestion-citas-container">
      <h2>Gestión De Citas</h2>
      <div className="options">
        <label>Mes:</label>
        <select value={currentMonthIndex} onChange={handleMonthChange}>
          {monthNames.slice(new Date().getMonth()).map((month, index) => (
            <option key={index} value={new Date().getMonth() + index}>
              {month}
            </option>
          ))}
        </select>

        <label>Días:</label>
        <div className="day-buttons">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`day-button ${
                selectedDays.includes(day) ? "selected" : ""
              }`}
              onClick={() => handleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <label>Agregar Intervalo Horario:</label>
        <div className="interval-selector">
          <label>De:</label>
          <input
            type="number"
            min="0"
            max="23"
            value={startHour}
            onChange={(e) => setStartHour(parseInt(e.target.value))}
          />
          :
          <select
            value={startMinute}
            onChange={(e) => setStartMinute(parseInt(e.target.value))}
          >
            <option value="0">00</option>
            <option value="30">30</option>
          </select>
          <label>A:</label>
          <input
            type="number"
            min="0"
            max="23"
            value={endHour}
            onChange={(e) => setEndHour(parseInt(e.target.value))}
          />
          :
          <select
            value={endMinute}
            onChange={(e) => setEndMinute(parseInt(e.target.value))}
          >
            <option value="0">00</option>
            <option value="30">30</option>
          </select>
          <button className="add-interval-button" onClick={handleAddInterval}>
            Agregar
          </button>
        </div>
      </div>

      <div
        className="time-grid"
        style={{ gridTemplateRows: `repeat(${rowsNeeded}, 1fr)` }}
      >
        {daysOfWeek.map((day, dayIndex) => (
          <div key={day} className="time-column">
            <div className="day-label">{day}</div>
            {[...Array(rowsNeeded)].map((_, rowIndex) => {
              const dayNumber = dayIndex + rowIndex * 7 - monthStartDay + 1;
              const isWithinMonth = dayNumber > 0 && dayNumber <= daysInMonth;
              const isAfterToday =
                currentMonthIndex > new Date().getMonth() ||
                (currentMonthIndex === new Date().getMonth() &&
                  dayNumber >= todayDate);
              const isSelectedDate = selectedDate === dayNumber.toString();
              const interval =
                isWithinMonth && isAfterToday
                  ? availability[dayNumber.toString()]
                  : "";

              return (
                <div
                  key={rowIndex}
                  className={`time-slot ${
                    isWithinMonth && isAfterToday
                      ? interval
                        ? "filled"
                        : ""
                      : "out-of-month"
                  } ${isSelectedDate ? "highlighted" : ""}`}
                  onClick={() =>
                    isWithinMonth && isAfterToday && handleDateClick(dayNumber)
                  }
                >
                  {isWithinMonth && (
                    <span className="day-number">{dayNumber}</span>
                  )}
                  {interval}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showError && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}

      <div>
        <button
          className="delete-interval-button"
          onClick={handleDeleteInterval}
        >
          Eliminar
        </button>
        <button className="add-interval-button" onClick={handleAddInterval}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Gestioncitas;
