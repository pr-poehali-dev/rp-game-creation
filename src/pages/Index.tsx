import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const JOBS = [
  { id: 1, name: "Президент", salary: 500000, category: "government", description: "Управление страной" },
  { id: 2, name: "Губернатор", salary: 350000, category: "government", description: "Управление регионом" },
  { id: 3, name: "Мэр", salary: 250000, category: "government", description: "Управление городом" },
  { id: 4, name: "Депутат Госдумы", salary: 200000, category: "government", description: "Законотворчество" },
  { id: 5, name: "Врач", salary: 120000, category: "medical", description: "Лечение пациентов" },
  { id: 6, name: "Хирург", salary: 180000, category: "medical", description: "Хирургические операции" },
  { id: 7, name: "Медсестра", salary: 60000, category: "medical", description: "Уход за пациентами" },
  { id: 8, name: "Учитель", salary: 70000, category: "education", description: "Преподавание в школе" },
  { id: 9, name: "Профессор", salary: 150000, category: "education", description: "Преподавание в университете" },
  { id: 10, name: "Директор школы", salary: 100000, category: "education", description: "Управление школой" },
  { id: 11, name: "Полицейский", salary: 80000, category: "law", description: "Охрана правопорядка" },
  { id: 12, name: "Детектив", salary: 120000, category: "law", description: "Расследование преступлений" },
  { id: 13, name: "Судья", salary: 200000, category: "law", description: "Вынесение приговоров" },
  { id: 14, name: "Адвокат", salary: 150000, category: "law", description: "Защита в суде" },
  { id: 15, name: "Прокурор", salary: 180000, category: "law", description: "Уголовное преследование" },
  { id: 16, name: "Пожарный", salary: 70000, category: "emergency", description: "Тушение пожаров" },
  { id: 17, name: "Фельдшер", salary: 65000, category: "emergency", description: "Скорая помощь" },
  { id: 18, name: "Журналист СМИ", salary: 90000, category: "media", description: "Написание новостей" },
  { id: 19, name: "Редактор СМИ", salary: 130000, category: "media", description: "Редактирование публикаций" },
  { id: 20, name: "Телеведущий", salary: 200000, category: "media", description: "Ведение телепередач" },
  { id: 21, name: "Бизнесмен", salary: 300000, category: "business", description: "Управление бизнесом" },
  { id: 22, name: "Банкир", salary: 250000, category: "business", description: "Финансовые операции" },
  { id: 23, name: "Риелтор", salary: 110000, category: "business", description: "Продажа недвижимости" },
  { id: 24, name: "Автодилер", salary: 140000, category: "business", description: "Продажа автомобилей" },
  { id: 25, name: "Таксист", salary: 50000, category: "transport", description: "Перевозка пассажиров" },
  { id: 26, name: "Водитель автобуса", salary: 55000, category: "transport", description: "Общественный транспорт" },
  { id: 27, name: "Пилот", salary: 300000, category: "transport", description: "Управление самолётом" },
  { id: 28, name: "Инженер", salary: 130000, category: "tech", description: "Разработка технологий" },
  { id: 29, name: "Программист", salary: 180000, category: "tech", description: "Разработка ПО" },
  { id: 30, name: "Электрик", salary: 70000, category: "tech", description: "Электромонтажные работы" },
  { id: 31, name: "Сантехник", salary: 65000, category: "tech", description: "Сантехнические работы" },
  { id: 32, name: "Строитель", salary: 75000, category: "construction", description: "Строительные работы" },
  { id: 33, name: "Архитектор", salary: 150000, category: "construction", description: "Проектирование зданий" },
  { id: 34, name: "Повар", salary: 60000, category: "service", description: "Приготовление блюд" },
  { id: 35, name: "Официант", salary: 40000, category: "service", description: "Обслуживание в ресторане" },
  { id: 36, name: "Бармен", salary: 50000, category: "service", description: "Приготовление напитков" },
  { id: 37, name: "Парикмахер", salary: 55000, category: "service", description: "Парикмахерские услуги" },
  { id: 38, name: "Фитнес-тренер", salary: 70000, category: "service", description: "Тренировки клиентов" },
  { id: 39, name: "Музыкант", salary: 80000, category: "art", description: "Музыкальные выступления" },
  { id: 40, name: "Художник", salary: 70000, category: "art", description: "Создание произведений" },
  { id: 41, name: "Актёр", salary: 150000, category: "art", description: "Актёрская игра" },
  { id: 42, name: "Фермер", salary: 60000, category: "agriculture", description: "Выращивание продуктов" },
  { id: 43, name: "Рыбак", salary: 55000, category: "agriculture", description: "Рыболовство" },
  { id: 44, name: "Военный", salary: 100000, category: "military", description: "Служба в армии" },
  { id: 45, name: "Охранник", salary: 50000, category: "security", description: "Охрана объектов" },
  { id: 46, name: "Детектив частный", salary: 110000, category: "security", description: "Частный сыск" },
  { id: 47, name: "Спортсмен", salary: 200000, category: "sport", description: "Профессиональный спорт" },
  { id: 48, name: "Менеджер", salary: 90000, category: "business", description: "Управление проектами" },
  { id: 49, name: "Маркетолог", salary: 100000, category: "business", description: "Продвижение продуктов" },
  { id: 50, name: "HR-специалист", salary: 85000, category: "business", description: "Подбор персонала" }
];

const DONATE_ITEMS = [
  { id: 1, name: "Донат Валюта 100", price: 100, icon: "Coins", description: "100 донат монет" },
  { id: 2, name: "Донат Валюта 500", price: 500, icon: "Coins", description: "500 донат монет" },
  { id: 3, name: "Донат Валюта 1000", price: 1000, icon: "Coins", description: "1000 донат монет" },
  { id: 4, name: "Премиум аккаунт 30 дней", price: 500, icon: "Crown", description: "Премиум возможности на месяц" },
  { id: 5, name: "VIP статус", price: 2000, icon: "Star", description: "Эксклюзивный VIP статус" },
  { id: 6, name: "Создать страну", price: 1000, icon: "Flag", description: "Создание собственного государства" }
];

const PROPERTIES = [
  { id: 1, name: "Квартира-студия", price: 500000, type: "apartment" },
  { id: 2, name: "2-комнатная квартира", price: 1200000, type: "apartment" },
  { id: 3, name: "Пентхаус", price: 5000000, type: "apartment" },
  { id: 4, name: "Загородный дом", price: 3000000, type: "house" },
  { id: 5, name: "Вилла", price: 10000000, type: "house" },
  { id: 6, name: "Особняк", price: 25000000, type: "house" }
];

const VEHICLES = [
  { id: 1, name: "ВАЗ 2107", price: 150000, type: "economy" },
  { id: 2, name: "Toyota Camry", price: 2500000, type: "business" },
  { id: 3, name: "Mercedes S-Class", price: 8000000, type: "luxury" },
  { id: 4, name: "Lamborghini", price: 25000000, type: "supercar" },
  { id: 5, name: "Мотоцикл", price: 500000, type: "bike" },
  { id: 6, name: "Яхта", price: 50000000, type: "water" }
];

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("main");
  const [playerData, setPlayerData] = useState({
    name: "Игрок",
    balance: 10000,
    donateBalance: 0,
    level: 1,
    job: "",
    hunger: 100,
    inventory: [] as string[],
    properties: [] as number[],
    vehicles: [] as number[]
  });
  const [laws, setLaws] = useState<Array<{ id: number; title: string; author: string; status: string }>>([]);
  const [news, setNews] = useState<Array<{ id: number; title: string; content: string; author: string }>>([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [devPassword, setDevPassword] = useState("");

  const handleJobSelect = (jobId: number) => {
    const job = JOBS.find(j => j.id === jobId);
    if (job) {
      setPlayerData({ ...playerData, job: job.name });
      toast({ title: "Работа получена!", description: `Вы устроились на должность: ${job.name}` });
    }
  };

  const handleBuyProperty = (propId: number) => {
    const property = PROPERTIES.find(p => p.id === propId);
    if (property && playerData.balance >= property.price) {
      setPlayerData({
        ...playerData,
        balance: playerData.balance - property.price,
        properties: [...playerData.properties, propId]
      });
      toast({ title: "Покупка совершена!", description: `Вы приобрели: ${property.name}` });
    } else {
      toast({ title: "Недостаточно средств!", variant: "destructive" });
    }
  };

  const handleBuyVehicle = (vehicleId: number) => {
    const vehicle = VEHICLES.find(v => v.id === vehicleId);
    if (vehicle && playerData.balance >= vehicle.price) {
      setPlayerData({
        ...playerData,
        balance: playerData.balance - vehicle.price,
        vehicles: [...playerData.vehicles, vehicleId]
      });
      toast({ title: "Покупка совершена!", description: `Вы приобрели: ${vehicle.name}` });
    } else {
      toast({ title: "Недостаточно средств!", variant: "destructive" });
    }
  };

  const handleBuyDonate = (itemId: number) => {
    const item = DONATE_ITEMS.find(i => i.id === itemId);
    if (item) {
      toast({ title: "Донат покупка", description: `${item.name} добавлен в корзину` });
    }
  };

  const handleCreateLaw = (title: string) => {
    const newLaw = {
      id: laws.length + 1,
      title,
      author: playerData.name,
      status: "На рассмотрении"
    };
    setLaws([...laws, newLaw]);
    toast({ title: "Законопроект создан!", description: title });
  };

  const handleCreateNews = (title: string, content: string) => {
    const newNews = {
      id: news.length + 1,
      title,
      content,
      author: playerData.name
    };
    setNews([...news, newNews]);
    toast({ title: "Новость опубликована!", description: title });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Landmark" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                РП ГОРОД
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Icon name="Coins" size={16} />
                {playerData.balance.toLocaleString()} ₽
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 border-accent text-accent">
                <Icon name="Gem" size={16} />
                {playerData.donateBalance} DC
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Icon name="User" size={16} />
                Ур. {playerData.level}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-8">
            <TabsTrigger value="main">Главная</TabsTrigger>
            <TabsTrigger value="jobs">Профессии</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="economy">Экономика</TabsTrigger>
            <TabsTrigger value="market">Рынок</TabsTrigger>
            <TabsTrigger value="auction">Аукцион</TabsTrigger>
            <TabsTrigger value="duma">Госдума</TabsTrigger>
            <TabsTrigger value="media">СМИ</TabsTrigger>
            <TabsTrigger value="donate">Донат</TabsTrigger>
            <TabsTrigger value="admin">Админ</TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <Icon name="Briefcase" className="text-primary mb-2" size={40} />
                  <CardTitle>50+ Профессий</CardTitle>
                  <CardDescription>От президента до таксиста</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition-all">
                <CardHeader>
                  <Icon name="Home" className="text-secondary mb-2" size={40} />
                  <CardTitle>Недвижимость</CardTitle>
                  <CardDescription>Квартиры, дома, особняки</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all">
                <CardHeader>
                  <Icon name="Car" className="text-accent mb-2" size={40} />
                  <CardTitle>Транспорт</CardTitle>
                  <CardDescription>Машины, яхты, самолёты</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all">
                <CardHeader>
                  <Icon name="Scale" className="text-primary mb-2" size={40} />
                  <CardTitle>Госдума</CardTitle>
                  <CardDescription>Создавайте законы</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/50 hover:shadow-lg hover:shadow-secondary/20 transition-all">
                <CardHeader>
                  <Icon name="Newspaper" className="text-secondary mb-2" size={40} />
                  <CardTitle>СМИ</CardTitle>
                  <CardDescription>Пишите новости</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all">
                <CardHeader>
                  <Icon name="Gem" className="text-accent mb-2" size={40} />
                  <CardTitle>Донат магазин</CardTitle>
                  <CardDescription>Премиум возможности</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" />
                  О игре
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Добро пожаловать в РП ГОРОД - реалистичную ролевую игру с детальной экономической системой, 
                  государственным управлением и множеством возможностей для развития. Устраивайтесь на работу, 
                  зарабатывайте деньги через мини-игры, покупайте недвижимость и транспорт, участвуйте в политике, 
                  пишите новости или создайте собственную страну!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Briefcase" />
                  Каталог профессий ({JOBS.length})
                </CardTitle>
                <CardDescription>Выберите работу и начните карьеру</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {JOBS.map((job) => (
                      <Card key={job.id} className="hover:border-primary transition-colors">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{job.name}</CardTitle>
                            <Badge variant="secondary">{job.salary.toLocaleString()} ₽</Badge>
                          </div>
                          <CardDescription>{job.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            onClick={() => handleJobSelect(job.id)} 
                            className="w-full"
                            variant={playerData.job === job.name ? "secondary" : "default"}
                          >
                            {playerData.job === job.name ? "Текущая работа" : "Устроиться"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" />
                    Профиль игрока
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Имя:</span>
                    <span className="font-semibold">{playerData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Уровень:</span>
                    <Badge>{playerData.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Работа:</span>
                    <span className="font-semibold">{playerData.job || "Безработный"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Баланс:</span>
                    <span className="font-semibold text-primary">{playerData.balance.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Донат валюта:</span>
                    <span className="font-semibold text-accent">{playerData.donateBalance} DC</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HeartPulse" />
                    Состояние
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Голод:</span>
                      <span className="font-semibold">{playerData.hunger}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${playerData.hunger}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" />
                  Инвентарь
                </CardTitle>
              </CardHeader>
              <CardContent>
                {playerData.inventory.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Инвентарь пуст</p>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {playerData.inventory.map((item, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="economy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Home" />
                    Недвижимость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {PROPERTIES.map((property) => (
                        <Card key={property.id} className="hover:border-primary transition-colors">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{property.name}</CardTitle>
                              <Badge variant="secondary">{property.price.toLocaleString()} ₽</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              onClick={() => handleBuyProperty(property.id)}
                              className="w-full"
                              disabled={playerData.properties.includes(property.id)}
                            >
                              {playerData.properties.includes(property.id) ? "Куплено" : "Купить"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Car" />
                    Транспорт
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {VEHICLES.map((vehicle) => (
                        <Card key={vehicle.id} className="hover:border-primary transition-colors">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{vehicle.name}</CardTitle>
                              <Badge variant="secondary">{vehicle.price.toLocaleString()} ₽</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button 
                              onClick={() => handleBuyVehicle(vehicle.id)}
                              className="w-full"
                              disabled={playerData.vehicles.includes(vehicle.id)}
                            >
                              {playerData.vehicles.includes(vehicle.id) ? "Куплено" : "Купить"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" />
                  Банк
                </CardTitle>
                <CardDescription>Управление финансами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20">
                    <Icon name="Download" className="mr-2" />
                    Пополнить счёт
                  </Button>
                  <Button variant="outline" className="h-20">
                    <Icon name="Upload" className="mr-2" />
                    Снять деньги
                  </Button>
                  <Button variant="outline" className="h-20">
                    <Icon name="ArrowRightLeft" className="mr-2" />
                    Перевести
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingCart" />
                  Рынок
                </CardTitle>
                <CardDescription>Покупайте и продавайте товары</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">Рынок открывается скоро...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gavel" />
                  Аукцион
                </CardTitle>
                <CardDescription>Участвуйте в торгах</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">Аукцион открывается скоро...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="duma" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Scale" />
                      Государственная Дума
                    </CardTitle>
                    <CardDescription>Законотворчество и управление</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" className="mr-2" size={16} />
                        Создать законопроект
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новый законопроект</DialogTitle>
                        <DialogDescription>Предложите новый закон на рассмотрение</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Название законопроекта</Label>
                          <Input id="lawTitle" placeholder="Введите название" />
                        </div>
                        <div>
                          <Label>Описание</Label>
                          <Textarea placeholder="Опишите суть законопроекта" />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            const input = document.getElementById("lawTitle") as HTMLInputElement;
                            if (input.value) handleCreateLaw(input.value);
                          }}
                        >
                          Подать на рассмотрение
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {laws.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Пока нет законопроектов</p>
                  ) : (
                    <div className="space-y-4">
                      {laws.map((law) => (
                        <Card key={law.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{law.title}</CardTitle>
                              <Badge>{law.status}</Badge>
                            </div>
                            <CardDescription>Автор: {law.author}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Icon name="ThumbsUp" className="mr-2" size={16} />
                                За
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Icon name="ThumbsDown" className="mr-2" size={16} />
                                Против
                              </Button>
                              <Button variant="destructive">
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Newspaper" />
                      Фракция СМИ
                    </CardTitle>
                    <CardDescription>Новостная лента города</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" className="mr-2" size={16} />
                        Написать новость
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новая публикация</DialogTitle>
                        <DialogDescription>Создайте новость для жителей города</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Заголовок</Label>
                          <Input id="newsTitle" placeholder="Введите заголовок" />
                        </div>
                        <div>
                          <Label>Текст новости</Label>
                          <Textarea id="newsContent" placeholder="Напишите новость" className="h-32" />
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            const title = (document.getElementById("newsTitle") as HTMLInputElement).value;
                            const content = (document.getElementById("newsContent") as HTMLTextAreaElement).value;
                            if (title && content) handleCreateNews(title, content);
                          }}
                        >
                          Опубликовать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {news.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">Пока нет новостей</p>
                  ) : (
                    <div className="space-y-4">
                      {news.map((item) => (
                        <Card key={item.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>Автор: {item.author}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{item.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gem" />
                  Донат магазин
                </CardTitle>
                <CardDescription>Премиум возможности и бонусы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DONATE_ITEMS.map((item) => (
                    <Card key={item.id} className="hover:border-accent transition-colors">
                      <CardHeader>
                        <Icon name={item.icon as any} className="text-accent mb-2" size={40} />
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Badge variant="secondary" className="w-full justify-center py-2">
                            {item.price} DC
                          </Badge>
                          <Button 
                            onClick={() => handleBuyDonate(item.id)}
                            className="w-full"
                            variant="default"
                          >
                            Купить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" />
                    Админ панель
                  </CardTitle>
                  <CardDescription>Управление игроками</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Пароль доступа</Label>
                    <Input 
                      type="password" 
                      placeholder="Введите пароль администратора"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                  {adminPassword === "admin123" ? (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Users" className="mr-2" size={16} />
                        Список игроков
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Ban" className="mr-2" size={16} />
                        Бан игрока
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="UserX" className="mr-2" size={16} />
                        Кик игрока
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Eye" className="mr-2" size={16} />
                        Слежка за игроками
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">Введите пароль для доступа</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Code" />
                    Панель разработчика
                  </CardTitle>
                  <CardDescription>Полный доступ к системе</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Пароль доступа</Label>
                    <Input 
                      type="password" 
                      placeholder="Введите пароль разработчика"
                      value={devPassword}
                      onChange={(e) => setDevPassword(e.target.value)}
                    />
                  </div>
                  {devPassword === "dev2024secure" ? (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Database" className="mr-2" size={16} />
                        Управление БД
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="FileCode" className="mr-2" size={16} />
                        Редактор кода
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Settings" className="mr-2" size={16} />
                        Системные настройки
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="UserCog" className="mr-2" size={16} />
                        Вход в аккаунты
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">Введите пароль для доступа</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
