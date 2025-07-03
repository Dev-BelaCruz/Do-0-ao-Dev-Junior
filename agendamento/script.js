 const { createApp, ref, computed, onMounted } = Vue;
        
        createApp({
            setup() {
                // Steps
                const currentStep = ref(1);
                const nextStep = () => currentStep.value++;
                const prevStep = () => currentStep.value--;
                
                // Sample data
                const professionals = ref([
                    {
                        id: 1,
                        name: "Dr. Carlos Silva",
                        specialty: "Dermatologista",
                        rating: 4.8,
                        photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4faa0118-10e7-4efb-a5a0-8df8b1888aae.png"
                    },
                    {
                        id: 2,
                        name: "Dra. Ana Oliveira",
                        specialty: "Dermatologista",
                        rating: 4.9,
                        photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9aac4658-18b6-4ea6-821d-4eff83fecb85.png"
                    },
                    {
                        id: 3,
                        name: "Carla Santos",
                        specialty: "Esteticista",
                        rating: 4.7,
                        photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2b69479b-f4c1-42cf-8fd8-abe1442beb6d.png"
                    },
                    {
                        id: 4,
                        name: "Marcelo Ribeiro",
                        specialty: "Barbeiro",
                        rating: 4.6,
                        photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a8a53b3-4854-46f8-b98f-dad83ff8e4d3.png"
                    }
                ]);
                
                const services = ref([
                    {
                        id: 1,
                        name: "Consulta Dermatológica",
                        description: "Avaliação completa da pele",
                        duration: 30,
                        price: 250,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d92d0f3f-e567-46f5-b469-b11770b2ede5.png"
                    },
                    {
                        id: 2,
                        name: "Limpeza de Pele",
                        description: "Limpeza profunda com extração",
                        duration: 60,
                        price: 180,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9800138a-8731-4d43-88a9-307bebb96578.png"
                    },
                    {
                        id: 3,
                        name: "Botox",
                        description: "Aplicação de toxina botulínica",
                        duration: 45,
                        price: 450,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a8f16cf9-6622-4c67-8310-f75298d54ba0.png"
                    },
                    {
                        id: 4,
                        name: "Corte Masculino",
                        description: "Corte com máquina e tesoura",
                        duration: 45,
                        price: 80,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4694696a-b0e6-401f-b2d3-ddefb04d1ef4.png"
                    },
                    {
                        id: 5,
                        name: "Coloração",
                        description: "Coloração completa com produtos premium",
                        duration: 120,
                        price: 220,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9959ba57-0bde-4f29-8523-00faa849f9e2.png"
                    },
                    {
                        id: 6,
                        name: "Manicure e Pedicure",
                        description: "Cuidados completos para unhas",
                        duration: 90,
                        price: 120,
                        icon: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f574b366-bb9a-487b-938a-67a37db4c344.png"
                    }
                ]);
                
                // Selected values
                const selectedProfessional = ref(null);
                const selectedService = ref(null);
                const selectedDate = ref(null);
                const selectedTime = ref(null);
                
                // Customer info
                const customerName = ref("");
                const customerPhone = ref("");
                const customerEmail = ref("");
                const customerNotes = ref("");
                const termsAccepted = ref(false);
                
                // Search
                const serviceSearch = ref("");
                
                // Calendar
                const currentDate = new Date();
                const currentMonth = ref(currentDate.getMonth());
                const currentYear = ref(currentDate.getFullYear());
                const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                
                // Loading states
                const loadingSlots = ref(false);
                
                // Booking confirmation
                const bookingConfirmed = ref(false);
                const bookingCode = ref("");
                
                // Computed properties
                const selectedProfessionalDetails = computed(() => {
                    return professionals.value.find(p => p.id === selectedProfessional.value) || {};
                });
                
                const selectedServiceDetails = computed(() => {
                    return services.value.find(s => s.id === selectedService.value) || {};
                });
                
                const filteredServices = computed(() => {
                    const search = serviceSearch.value.toLowerCase();
                    return services.value.filter(service => 
                        service.name.toLowerCase().includes(search) || 
                        service.description.toLowerCase().includes(search)
                    );
                });
                
                const formatSelectedDate = computed(() => {
                    if (!selectedDate.value) return "";
                    const options = { weekday: 'long', day: 'numeric', month: 'long' };
                    return selectedDate.value.toLocaleDateString('pt-BR', options);
                });
                
                const canConfirmBooking = computed(() => {
                    return customerName.value && customerPhone.value && customerEmail.value && termsAccepted.value;
                });
                
                // Calendar days generation
                const calendarDays = computed(() => {
                    const days = [];
                    const date = new Date(currentYear.value, currentMonth.value, 1);
                    
                    // Get the first day of the month (0-6 where 0 is Sunday)
                    const firstDay = date.getDay();
                    
                    // Move to the previous month to add days from the end
                    date.setDate(0);
                    
                    // Add days from previous month
                    const prevMonthDays = date.getDate();
                    for (let i = firstDay - 1; i >= 0; i--) {
                        const prevDate = new Date(currentYear.value, currentMonth.value - 1, prevMonthDays - i);
                        days.push({
                            date: prevDate,
                            currentMonth: false,
                            isSelected: selectedDate.value && selectedDate.value.getDate() === prevDate.getDate() && selectedDate.value.getMonth() === prevDate.getMonth(),
                            available: false
                        });
                    }
                    
                    // Reset to current month
                    date.setMonth(currentMonth.value);
                    date.setDate(1);
                    
                    // Add days from current month
                    const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
                    for (let i = 0; i < totalDays; i++) {
                        const currentDate = new Date(currentYear.value, currentMonth.value, i + 1);
                        
                        // Simulate availability (in a real app, this would come from an API)
                        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
                        const available = !isWeekend;
                        
                        days.push({
                            date: currentDate,
                            currentMonth: true,
                            isSelected: selectedDate.value && selectedDate.value.getDate() === currentDate.getDate() && selectedDate.value.getMonth() === currentMonth.value,
                            available
                        });
                    }
                    
                    // Add days from next month to complete the grid
                    const nextMonthDays = 42 - days.length; // 6 weeks
                    for (let i = 0; i < nextMonthDays; i++) {
                        const nextDate = new Date(currentYear.value, currentMonth.value + 1, i + 1);
                        days.push({
                            date: nextDate,
                            currentMonth: false,
                            isSelected: false,
                            available: false
                        });
                    }
                    
                    return days;
                });
                
                // Time slots with AI recommendations
                const availableTimeSlots = ref([
                    { time: "08:00", recommended: false },
                    { time: "09:15", recommended: false },
                    { time: "10:30", recommended: true },
                    { time: "11:45", recommended: false },
                    { time: "13:00", recommended: false },
                    { time: "14:30", recommended: true },
                    { time: "15:45", recommended: false },
                    { time: "17:00", recommended: false }
                ]);
                
                // Methods
                const selectProfessional = (id) => {
                    selectedProfessional.value = id;
                };
                
                const selectService = (id) => {
                    selectedService.value = id;
                };
                
                const selectDate = (date, available) => {
                    if (!available) return;
                    selectedDate.value = date;
                    selectedTime.value = null;
                    
                    // Simulate loading time slots
                    loadingSlots.value = true;
                    setTimeout(() => {
                        loadingSlots.value = false;
                    }, 800);
                };
                
                const prevMonth = () => {
                    if (currentMonth.value === 0) {
                        currentMonth.value = 11;
                        currentYear.value--;
                    } else {
                        currentMonth.value--;
                    }
                };
                
                const nextMonth = () => {
                    if (currentMonth.value === 11) {
                        currentMonth.value = 0;
                        currentYear.value++;
                    } else {
                        currentMonth.value++;
                    }
                };
                
                const formatPrice = (price) => {
                    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
                };
                
                const confirmBooking = () => {
                    // In a real app, this would send data to a backend
                    bookingCode.value = "BK" + Math.floor(1000 + Math.random() * 9000);
                    currentStep.value = 5; // Go to confirmation step
                };
                
                const startNewBooking = () => {
                    // Reset everything
                    selectedProfessional.value = null;
                    selectedService.value = null;
                    selectedDate.value = null;
                    selectedTime.value = null;
                    customerName.value = "";
                    customerPhone.value = "";
                    customerEmail.value = "";
                    customerNotes.value = "";
                    termsAccepted.value = false;
                    currentStep.value = 1;
                };
                
                const addToGoogleCalendar = () => {
                    // In a real app, this would open Google Calendar with the event details
                    alert("Esta funcionalidade abriria o Google Calendar com os detalhes do agendamento em uma aplicação real.");
                };
                
                return {
                    currentStep,
                    nextStep,
                    prevStep,
                    professionals,
                    services,
                    selectedProfessional,
                    selectedService,
                    selectedDate,
                    selectedTime,
                    customerName,
                    customerPhone,
                    customerEmail,
                    customerNotes,
                    termsAccepted,
                    serviceSearch,
                    currentMonth,
                    currentYear,
                    monthNames,
                    loadingSlots,
                    bookingConfirmed,
                    bookingCode,
                    selectedProfessionalDetails,
                    selectedServiceDetails,
                    filteredServices,
                    formatSelectedDate,
                    canConfirmBooking,
                    calendarDays,
                    availableTimeSlots,
                    selectProfessional,
                    selectService,
                    selectDate,
                    prevMonth,
                    nextMonth,
                    formatPrice,
                    confirmBooking,
                    startNewBooking,
                    addToGoogleCalendar
                };
            }
        }).mount('#app');