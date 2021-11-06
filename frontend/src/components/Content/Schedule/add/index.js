import { Card } from "../../../Card";
import { Button } from "../../../Button";

export const Add = ({ rooms, schedules }) => {
  return (
    <div className="content content--flex-column">
      <h2 className="content__title">Cadastrar Agendamentos</h2>

      <div className="content__bottom">
        <div className="content__header">
          <span style={{marginRight: 110}}>Espaço:</span>
          <span>Data:</span>
          <span>Status:</span>
        </div>

        {/* Acho que esse map aqui vai ter que ser um array novo, filtrado com os dois arrays (rooms e schedules) e organizado por id */}
        {rooms.map((room, index) => {
          const isAvailable = room.status === "available";
          const scheduledRooms = schedules.filter(scheduledRoom => scheduledRoom.espaco.id === room.id);
          console.log({schedules})
          console.log({scheduledRooms})

          return (
            <Card key={`room-schedule-${index}`}>
              <span className="card__name">{room.nomeEspaco}</span>
              <span className="card__name">{isAvailable ? "" : room.date}</span>
              <Button className={`button button--fit-content button--card ${isAvailable ? "available" : "occupied"}`}>
                {isAvailable ? "Agendar" : "Ocupado"}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}