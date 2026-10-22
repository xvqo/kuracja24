export const PHONE = '83 352 24 92';
export const PHONE_HREF = 'tel:+48833522492';
export const EMAIL = 'kontakt@kuracja24.pl';

const MAPS_QUERY = 'Warszawska+17,+21-300+Radzy%C5%84+Podlaski';
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;

// Podstrony jeszcze nie istnieją – podmienić na prawdziwe ścieżki, gdy powstaną.
export const PAGES = {
  schedule: '#',
  treatments: '#',
  nfzRules: '#',
  whatToBring: '#',
  terms: '#',
  privacy: '#',
  studio: '#',
} as const;

export const NAV_LINKS = [
  { href: '#przychodnia', label: 'Przychodnia' },
  { href: '#fizjoterapia', label: 'Fizjoterapia' },
  { href: '#nfz', label: 'NFZ' },
  { href: '#rejestracja', label: 'Rejestracja' },
  { href: '#kontakt', label: 'Kontakt' },
];

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

export type Clinic = { name: string; description: string; photo: string; href: string };

export const CLINICS: Clinic[] = [
  { name: 'Reumatologia', description: 'Choroby stawów, kręgosłupa i tkanki łącznej', photo: unsplash('1758063800058-473d9071937a') },
  { name: 'Alergologia', description: 'Diagnostyka i leczenie alergii', photo: unsplash('1758691461935-202e2ef6b69f') },
  { name: 'Okulistyka', description: 'Badanie wzroku i choroby oczu', photo: unsplash('1666887360361-d4e8487f0026') },
  { name: 'Endokrynologia', description: 'Tarczyca, cukrzyca i zaburzenia hormonalne', photo: unsplash('1758691461990-03b49d969495') },
  { name: 'Dermatologia', description: 'Choroby skóry, włosów i paznokci', photo: unsplash('1638202993928-7267aad84c31') },
  { name: 'Laryngologia', description: 'Ucho, nos, gardło i krtań', photo: unsplash('1758691462878-6edc3d3da1be') },
  { name: 'Chirurgia naczyniowa', description: 'Żylaki i choroby naczyń krwionośnych', photo: unsplash('1758691462123-8a17ae95d203') },
  { name: 'Urologia', description: 'Układ moczowy i męski układ płciowy', photo: unsplash('1584516150909-c43483ee7932') },
  { name: 'Neurologia', description: 'Układ nerwowy, bóle głowy i kręgosłupa', photo: unsplash('1768507423533-b87b62769758') },
].map((clinic) => ({ ...clinic, href: '#' }));

export const TREATMENTS = [
  { name: 'Kinezyterapia', description: 'Ćwiczenia lecznicze pod okiem rehabilitanta' },
  { name: 'Krioterapia', description: 'Miejscowe leczenie zimnem, łagodzi ból i obrzęk' },
  { name: 'Masaże', description: 'Rozluźnienie mięśni i poprawa krążenia' },
  { name: 'Elektrolecznictwo', description: 'Prądy lecznicze o działaniu przeciwbólowym' },
  { name: 'Pole elektromagnetyczne', description: 'Magnetoterapia wspierająca regenerację tkanek' },
  { name: 'Światło- i ciepłolecznictwo', description: 'Naświetlania i zabiegi cieplne' },
];

export const REGISTRATION_STEPS = [
  {
    title: 'Zadzwoń lub przyjdź',
    description: `Telefonicznie pod numerem ${PHONE} albo osobiście w rejestracji przy ul. Warszawskiej 17.`,
  },
  {
    title: 'Przygotuj dokumenty',
    description: 'Dokument tożsamości, a przy wizycie w ramach NFZ także skierowanie, jeśli jest wymagane.',
  },
  {
    title: 'Przyjdź kilka minut wcześniej',
    description: 'Spokojnie dopełnisz formalności przed wizytą lub zabiegiem.',
  },
];

export const VALUES = [
  { name: 'Wiedza', description: 'Nasi specjaliści stale się rozwijają i podnoszą kwalifikacje.' },
  {
    name: 'Doświadczenie',
    description: 'Na co dzień pracujemy z różnorodnymi przypadkami, od ostrych urazów po choroby przewlekłe.',
  },
  { name: 'Zespół', description: 'Lekarz i rehabilitant w jednym miejscu, więc leczenie i rehabilitacja idą w parze.' },
  { name: 'Sprzęt', description: 'Nowoczesna aparatura diagnostyczna i urządzenia do zabiegów rehabilitacyjnych.' },
];

export const ABOUT_PHOTOS = [
  { src: unsplash('1772122028843-9139d23af4fb'), alt: 'Zabieg z użyciem aparatu fizykoterapeutycznego', tall: true },
  { src: unsplash('1519823551278-64ac92734fb1'), alt: 'Masaż leczniczy pleców', tall: false },
  { src: unsplash('1758063800058-473d9071937a'), alt: 'Dłoń terapeuty na plecach pacjenta', tall: true },
];

export const PHYSIO_PHOTO = unsplash('1706353399656-210cca727a33');
