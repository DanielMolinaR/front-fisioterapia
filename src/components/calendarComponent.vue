<template>
  <v-container>
    <v-row class="fill-height" v-if="keyComponent">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="#fffafa">
            <v-btn outlined class="ml-n4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2"  v-bind="attrs" v-on="on" class="mr-n4">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet>
          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" 
            :event-color="getEventColor" :type="type" @click:event="showEvent"
            @click:more="viewDay" @click:date="viewDay" @change="updateRange"
            :weekdays=this.daysOfWeek>
          </v-calendar>
          <v-menu v-model="selectedOpen" :close-on-content-click="false" 
              :activator="selectedElement" offset-x max-width="50%"
              >
            <v-card color="#fffafa" min-width="100%" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col cols="6">
                    <v-btn text :color="selectedEvent.color" @click="selectedOpen = false">
                      Cerrar
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn text color="red accent-2" @click="selectedOpen = false; Ddialog = !Ddialog; ">
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row align="right" justify="right" class="py-6" v-if="user_level > 0">
      <v-col v-if="user_level === 2"  class="mt-n16">
        <v-col v-for="employee in this.arrayEmployees" :key="employee.Name">
          <span v-if="employee.Name != 'function String() { [native code] }'" v-text="employee.Name"/><v-btn :color="employee.Color" class="ml-1"></v-btn>
        </v-col>
      </v-col>
      <v-col>
        <v-card>
            <v-fab-transition>
            <v-btn color="#F5914D" dark absolute
              top right fab @click="Adialog = !Adialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="Adialog" max-width="500px">
      <CreateAppointment/>
    </v-dialog>
    <v-dialog v-model="Ddialog" max-width="500px">
      <template>
          <v-card flat>
              <v-container fluid>
                  <v-row justify="space-around" align="center" >
                      <v-col cols="12" class="d-flex justify-center">
                          <p class="mr-2">¿Estás seguro que quieres cancelar esta cita?</p>
                      </v-col>
                      <v-col cols="6" class="d-flex justify-center">
                          <v-btn class="mr-2" outlined color="red accent-2" :dark= true @click="Ddialog = !Ddialog">
                              NO
                          </v-btn>
                      </v-col>
                      <v-col cols="6" class="d-flex justify-center">
                          <v-btn class="mr-2" color="green accent-2" :dark= true @click="deleteAppointment">
                              SÍ
                          </v-btn>
                      </v-col>
                  </v-row>
              </v-container>
          </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import CreateAppointment from "../components/CreateAppointment"
import auth from "../logic/Auth";

  export default {
    name: "calendarComponent",

    components: {
      CreateAppointment,
    },

    props: {
      user_level: Number,
      eventsDataToIterate: Array,
      keyComponent: Boolean,
    },

    data: () => ({
      show: false,
      Ddialog: false,
      Adialog: false,
      focus: '',
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [ ],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', '#5C51F0', '#F0C151', '#6DF000', '#F53D38', '#E243F5', '#2CDBDB'],
      daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      arrayEmployees: [{Name: String, Color: String}],
    }),

    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange () {
        const events = []
        console.log("entra en el update")

        var tmpColors = this.colors

        for (let appoint in this.$props.eventsDataToIterate) {
          console.log(this.$props.eventsDataToIterate)
          console.log(appoint)
          var appointmentData = this.$props.eventsDataToIterate[appoint]
          console
          const first = new Date (appointmentData.date + " " + appointmentData.hour + ":00")
          const second = new Date (appointmentData.date + " " + (parseInt(appointmentData.hour.substring(0,2)) + 1) + ":00:00")
          console.log("Inicio: " + first)
          console.log("Final: " + second)

          if (this.$props.user_level === 2){
            var name = appointmentData.title.substring(20, appointmentData.title.length)
            if (!this.arrayEmployees.some( employee => employee['Name'] === name )){
              var color = tmpColors[this.rnd(0, this.colors.length - 1)]
              tmpColors = tmpColors.filter(item => item !== color)
              var employee = {Name: name, Color: color}
              this.arrayEmployees.push(employee)
            }
          }

          events.push({
            name: appointmentData.title,
            start: first,
            end: second,
            color: this.$props.user_level === 2 ? this.arrayEmployees.find(employee => {return employee.Name === name}).Color : tmpColors[this.rnd(0, this.colors.length - 1)],
            details: appointmentData.details,
            timed: true,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

      async deleteAppointment(){

        console.log(this.selectedEvent)
        console.log(this.selectedElement)
        /*
        try{
            let dateData = {
                DateTime: this.date + this.hour,
            };
            let response = await auth.deleteAppointment(dateData)
            console.log(response)
            this.$router.go(0)
        } catch (error) {
            console.log(error.response)
            if (error.response.data.state === "Token no valido"){
                await this.changeTokens()
            } else {
                this.$router.push({name: "error", params:{error: error.response.data.state}});
            }
        }*/
      },

      async changeTokens(){
        try{
            let response = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)

            let accessToken = response.data.accessToken
            let refreshToken = response.data.refreshToken

            await this.$store
                .dispatch("tokensChange", { accessToken, refreshToken })
                .then(() => this.deleteAppointment());
        } catch (error){
            this.$store.dispatch("userLogout");
        }
      },
    },
  }
</script>