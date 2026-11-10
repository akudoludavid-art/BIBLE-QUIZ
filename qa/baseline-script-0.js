
const SCRIPTURES=[{"book": "Genesis", "ref": "1:1", "text": "In the beginning God created the heaven and the earth."}, {"book": "Genesis", "ref": "50:20", "text": "But as for you, ye thought evil against me; but God meant it unto good."}, {"book": "Exodus", "ref": "14:14", "text": "The LORD shall fight for you, and ye shall hold your peace."}, {"book": "Exodus", "ref": "20:3", "text": "Thou shalt have no other gods before me."}, {"book": "Leviticus", "ref": "19:18", "text": "Thou shalt love thy neighbour as thyself: I am the LORD."}, {"book": "Numbers", "ref": "6:24", "text": "The LORD bless thee, and keep thee:"}, {"book": "Deuteronomy", "ref": "6:5", "text": "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might."}, {"book": "Deuteronomy", "ref": "8:3", "text": "Man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD doth man live."}, {"book": "Joshua", "ref": "1:9", "text": "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."}, {"book": "Judges", "ref": "21:25", "text": "In those days there was no king in Israel: every man did that which was right in his own eyes."}, {"book": "Ruth", "ref": "1:16", "text": "Whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God:"}, {"book": "1 Samuel", "ref": "16:7", "text": "For man looketh on the outward appearance, but the LORD looketh on the heart."}, {"book": "1 Samuel", "ref": "17:47", "text": "The battle is the LORD'S, and he will give you into our hands."}, {"book": "2 Samuel", "ref": "22:2", "text": "The LORD is my rock, and my fortress, and my deliverer;"}, {"book": "1 Kings", "ref": "18:21", "text": "How long halt ye between two opinions? if the LORD be God, follow him: but if Baal, then follow him."}, {"book": "2 Kings", "ref": "6:16", "text": "Fear not: for they that be with us are more than they that be with them."}, {"book": "1 Chronicles", "ref": "16:11", "text": "Seek the LORD and his strength, seek his face continually."}, {"book": "2 Chronicles", "ref": "7:14", "text": "If my people, which are called by my name, shall humble themselves, and pray, and seek my face... then will I hear from heaven."}, {"book": "Ezra", "ref": "7:10", "text": "For Ezra had prepared his heart to seek the law of the LORD, and to do it, and to teach in Israel statutes and judgments."}, {"book": "Nehemiah", "ref": "8:10", "text": "The joy of the LORD is your strength."}, {"book": "Esther", "ref": "4:14", "text": "And who knoweth whether thou art come to the kingdom for such a time as this?"}, {"book": "Job", "ref": "19:25", "text": "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth:"}, {"book": "Job", "ref": "1:21", "text": "The LORD gave, and the LORD hath taken away; blessed be the name of the LORD."}, {"book": "Psalms", "ref": "23:1", "text": "The LORD is my shepherd; I shall not want."}, {"book": "Psalms", "ref": "27:1", "text": "The LORD is my light and my salvation; whom shall I fear?"}, {"book": "Psalms", "ref": "46:1", "text": "God is our refuge and strength, a very present help in trouble."}, {"book": "Psalms", "ref": "91:1", "text": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty."}, {"book": "Psalms", "ref": "119:105", "text": "Thy word is a lamp unto my feet, and a light unto my path."}, {"book": "Psalms", "ref": "121:1-2", "text": "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth."}, {"book": "Proverbs", "ref": "3:5-6", "text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."}, {"book": "Proverbs", "ref": "18:21", "text": "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof."}, {"book": "Proverbs", "ref": "22:6", "text": "Train up a child in the way he should go: and when he is old, he will not depart from it."}, {"book": "Ecclesiastes", "ref": "3:1", "text": "To every thing there is a season, and a time to every purpose under the heaven:"}, {"book": "Ecclesiastes", "ref": "12:13", "text": "Fear God, and keep his commandments: for this is the whole duty of man."}, {"book": "Song of Solomon", "ref": "8:7", "text": "Many waters cannot quench love, neither can the floods drown it:"}, {"book": "Isaiah", "ref": "9:6", "text": "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder."}, {"book": "Isaiah", "ref": "40:31", "text": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles."}, {"book": "Isaiah", "ref": "53:5", "text": "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him."}, {"book": "Isaiah", "ref": "55:8-9", "text": "For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD. For as the heavens are higher than the earth, so are my ways higher than your ways."}, {"book": "Jeremiah", "ref": "17:9", "text": "The heart is deceitful above all things, and desperately wicked: who can know it?"}, {"book": "Jeremiah", "ref": "29:11", "text": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil."}, {"book": "Jeremiah", "ref": "33:3", "text": "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not."}, {"book": "Lamentations", "ref": "3:22-23", "text": "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."}, {"book": "Ezekiel", "ref": "36:26", "text": "A new heart also will I give you, and a new spirit will I put within you."}, {"book": "Ezekiel", "ref": "18:20", "text": "The soul that sinneth, it shall die."}, {"book": "Daniel", "ref": "3:17", "text": "Our God whom we serve is able to deliver us from the burning fiery furnace."}, {"book": "Daniel", "ref": "6:22", "text": "My God hath sent his angel, and hath shut the lions' mouths, that they have not hurt me."}, {"book": "Hosea", "ref": "4:6", "text": "My people are destroyed for lack of knowledge."}, {"book": "Joel", "ref": "2:28", "text": "I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy."}, {"book": "Amos", "ref": "3:3", "text": "Can two walk together, except they be agreed?"}, {"book": "Obadiah", "ref": "1:15", "text": "For the day of the LORD is near upon all the heathen."}, {"book": "Jonah", "ref": "2:9", "text": "Salvation is of the LORD."}, {"book": "Micah", "ref": "6:8", "text": "What doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?"}, {"book": "Nahum", "ref": "1:7", "text": "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him."}, {"book": "Habakkuk", "ref": "2:4", "text": "The just shall live by his faith."}, {"book": "Zephaniah", "ref": "3:17", "text": "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy."}, {"book": "Haggai", "ref": "1:5", "text": "Now therefore thus saith the LORD of hosts; Consider your ways."}, {"book": "Zechariah", "ref": "4:6", "text": "Not by might, nor by power, but by my spirit, saith the LORD of hosts."}, {"book": "Malachi", "ref": "3:10", "text": "Bring ye all the tithes into the storehouse... and prove me now herewith, saith the LORD of hosts."}, {"book": "Matthew", "ref": "5:14", "text": "Ye are the light of the world. A city that is set on an hill cannot be hid."}, {"book": "Matthew", "ref": "6:33", "text": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."}, {"book": "Matthew", "ref": "11:28", "text": "Come unto me, all ye that labour and are heavy laden, and I will give you rest."}, {"book": "Matthew", "ref": "28:19", "text": "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:"}, {"book": "Mark", "ref": "8:36", "text": "For what shall it profit a man, if he shall gain the whole world, and lose his own soul?"}, {"book": "Mark", "ref": "9:23", "text": "If thou canst believe, all things are possible to him that believeth."}, {"book": "Luke", "ref": "1:37", "text": "For with God nothing shall be impossible."}, {"book": "Luke", "ref": "6:31", "text": "And as ye would that men should do to you, do ye also to them likewise."}, {"book": "Luke", "ref": "19:10", "text": "For the Son of man is come to seek and to save that which was lost."}, {"book": "John", "ref": "1:1", "text": "In the beginning was the Word, and the Word was with God, and the Word was God."}, {"book": "John", "ref": "3:16", "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."}, {"book": "John", "ref": "8:32", "text": "And ye shall know the truth, and the truth shall make you free."}, {"book": "John", "ref": "11:25", "text": "I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:"}, {"book": "John", "ref": "14:6", "text": "I am the way, the truth, and the life: no man cometh unto the Father, but by me."}, {"book": "Acts", "ref": "1:8", "text": "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me."}, {"book": "Acts", "ref": "4:12", "text": "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved."}, {"book": "Acts", "ref": "16:31", "text": "Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house."}, {"book": "Romans", "ref": "3:23", "text": "For all have sinned, and come short of the glory of God;"}, {"book": "Romans", "ref": "8:28", "text": "And we know that all things work together for good to them that love God."}, {"book": "Romans", "ref": "10:9", "text": "If thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved."}, {"book": "Romans", "ref": "12:2", "text": "And be not conformed to this world: but be ye transformed by the renewing of your mind."}, {"book": "1 Corinthians", "ref": "6:19", "text": "Know ye not that your body is the temple of the Holy Ghost which is in you?"}, {"book": "1 Corinthians", "ref": "10:13", "text": "God is faithful, who will not suffer you to be tempted above that ye are able."}, {"book": "1 Corinthians", "ref": "13:13", "text": "And now abideth faith, hope, charity, these three; but the greatest of these is charity."}, {"book": "2 Corinthians", "ref": "5:17", "text": "Therefore if any man be in Christ, he is a new creature: old things are passed away."}, {"book": "2 Corinthians", "ref": "12:9", "text": "My grace is sufficient for thee: for my strength is made perfect in weakness."}, {"book": "Galatians", "ref": "2:20", "text": "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me."}, {"book": "Galatians", "ref": "5:22-23", "text": "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance."}, {"book": "Ephesians", "ref": "2:8", "text": "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:"}, {"book": "Ephesians", "ref": "6:11", "text": "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."}, {"book": "Philippians", "ref": "4:6", "text": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."}, {"book": "Philippians", "ref": "4:13", "text": "I can do all things through Christ which strengtheneth me."}, {"book": "Colossians", "ref": "3:23", "text": "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;"}, {"book": "1 Thessalonians", "ref": "5:17", "text": "Pray without ceasing."}, {"book": "2 Thessalonians", "ref": "3:10", "text": "If any would not work, neither should he eat."}, {"book": "1 Timothy", "ref": "4:12", "text": "Let no man despise thy youth; but be thou an example of the believers."}, {"book": "2 Timothy", "ref": "1:7", "text": "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."}, {"book": "2 Timothy", "ref": "2:15", "text": "Study to shew thyself approved unto God, a workman that needeth not to be ashamed."}, {"book": "2 Timothy", "ref": "3:16", "text": "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction."}, {"book": "Titus", "ref": "2:11", "text": "For the grace of God that bringeth salvation hath appeared to all men,"}, {"book": "Philemon", "ref": "1:6", "text": "That the communication of thy faith may become effectual by the acknowledging of every good thing which is in you in Christ Jesus."}, {"book": "Hebrews", "ref": "4:12", "text": "For the word of God is quick, and powerful, and sharper than any twoedged sword."}, {"book": "Hebrews", "ref": "11:1", "text": "Now faith is the substance of things hoped for, the evidence of things not seen."}, {"book": "Hebrews", "ref": "13:8", "text": "Jesus Christ the same yesterday, and to day, and for ever."}, {"book": "James", "ref": "1:5", "text": "If any of you lack wisdom, let him ask of God, that giveth to all men liberally."}, {"book": "James", "ref": "1:22", "text": "But be ye doers of the word, and not hearers only, deceiving your own selves."}, {"book": "1 Peter", "ref": "5:7", "text": "Casting all your care upon him; for he careth for you."}, {"book": "2 Peter", "ref": "3:9", "text": "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward."}, {"book": "1 John", "ref": "1:9", "text": "If we confess our sins, he is faithful and just to forgive us our sins."}, {"book": "1 John", "ref": "4:8", "text": "He that loveth not knoweth not God; for God is love."}, {"book": "2 John", "ref": "1:6", "text": "And this is love, that we walk after his commandments."}, {"book": "3 John", "ref": "1:4", "text": "I have no greater joy than to hear that my children walk in truth."}, {"book": "Jude", "ref": "1:24", "text": "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory."}, {"book": "Revelation", "ref": "3:20", "text": "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him."}, {"book": "Revelation", "ref": "21:4", "text": "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying."}, {"book": "Revelation", "ref": "22:13", "text": "I am Alpha and Omega, the beginning and the end, the first and the last."}];
const PARABLES=[{"name": "The Sower", "ref": "Matthew 13:3–23; Mark 4:3–20; Luke 8:5–15", "theme": "Different responses to the word."}, {"name": "The Wheat and Tares", "ref": "Matthew 13:24–30, 36–43", "theme": "Good and evil remain together until judgment."}, {"name": "The Mustard Seed", "ref": "Matthew 13:31–32; Mark 4:30–32; Luke 13:18–19", "theme": "The kingdom grows from a small beginning."}, {"name": "The Leaven", "ref": "Matthew 13:33; Luke 13:20–21", "theme": "The kingdom's influence spreads."}, {"name": "The Hidden Treasure", "ref": "Matthew 13:44", "theme": "The surpassing value of the kingdom."}, {"name": "The Pearl of Great Price", "ref": "Matthew 13:45–46", "theme": "The kingdom is worth giving up everything to obtain."}, {"name": "The Unforgiving Servant", "ref": "Matthew 18:23–35", "theme": "Those forgiven should forgive."}, {"name": "The Labourers in the Vineyard", "ref": "Matthew 20:1–16", "theme": "God's generosity is not governed by human comparison."}, {"name": "The Two Sons", "ref": "Matthew 21:28–32", "theme": "Obedience matters more than profession."}, {"name": "The Wicked Husbandmen", "ref": "Matthew 21:33–46; Mark 12:1–12; Luke 20:9–19", "theme": "Rejection of God's messengers and Son."}, {"name": "The Marriage Feast", "ref": "Matthew 22:1–14", "theme": "Invitation, response and readiness for the kingdom."}, {"name": "The Ten Virgins", "ref": "Matthew 25:1–13", "theme": "Be watchful and prepared."}, {"name": "The Talents", "ref": "Matthew 25:14–30", "theme": "Faithful stewardship of what is entrusted."}, {"name": "The Good Samaritan", "ref": "Luke 10:30–37", "theme": "Neighbour-love crosses social boundaries."}, {"name": "The Rich Fool", "ref": "Luke 12:16–21", "theme": "Earthly wealth cannot secure life before God."}, {"name": "The Lost Sheep", "ref": "Matthew 18:12–14; Luke 15:3–7", "theme": "Joy over recovering the lost."}, {"name": "The Lost Coin", "ref": "Luke 15:8–10", "theme": "Joy over one sinner who repents."}, {"name": "The Prodigal Son", "ref": "Luke 15:11–32", "theme": "Repentance, restoration and the father's welcome."}, {"name": "The Rich Man and Lazarus", "ref": "Luke 16:19–31", "theme": "A reversal after death and the sufficiency of God's revealed warning."}, {"name": "The Pharisee and the Publican", "ref": "Luke 18:9–14", "theme": "Humility and repentance rather than self-righteousness."}];
const MIRACLES=[{"name": "Water into wine", "ref": "John 2:1–11"}, {"name": "Healing the nobleman's son", "ref": "John 4:46–54"}, {"name": "Miraculous catch of fish", "ref": "Luke 5:1–11"}, {"name": "Healing a leper", "ref": "Matthew 8:1–4; Mark 1:40–45; Luke 5:12–16"}, {"name": "Healing the centurion's servant", "ref": "Matthew 8:5–13; Luke 7:1–10"}, {"name": "Healing Peter's mother-in-law", "ref": "Matthew 8:14–15; Mark 1:29–31; Luke 4:38–39"}, {"name": "Calming the storm", "ref": "Matthew 8:23–27; Mark 4:35–41; Luke 8:22–25"}, {"name": "Delivering the Gerasene/Gadarene demoniac", "ref": "Mark 5:1–20; Luke 8:26–39"}, {"name": "Healing the woman with the issue of blood", "ref": "Matthew 9:20–22; Mark 5:25–34; Luke 8:43–48"}, {"name": "Raising Jairus's daughter", "ref": "Matthew 9:18–26; Mark 5:21–43; Luke 8:40–56"}, {"name": "Feeding the five thousand", "ref": "Matthew 14:13–21; Mark 6:30–44; Luke 9:10–17; John 6:1–14"}, {"name": "Walking on water", "ref": "Matthew 14:22–33; Mark 6:45–52; John 6:16–21"}, {"name": "Healing the deaf man", "ref": "Mark 7:31–37"}, {"name": "Feeding the four thousand", "ref": "Matthew 15:32–39; Mark 8:1–10"}, {"name": "Healing the man born blind", "ref": "John 9:1–41"}, {"name": "Healing ten lepers", "ref": "Luke 17:11–19"}, {"name": "Raising Lazarus", "ref": "John 11:1–44"}, {"name": "Healing blind Bartimaeus", "ref": "Mark 10:46–52; Luke 18:35–43"}, {"name": "Withering the fig tree", "ref": "Matthew 21:18–22; Mark 11:12–25"}, {"name": "Healing the high priest's servant's ear", "ref": "Luke 22:50–51"}];

const DATA = [
{t:"ot",n:"Adam",kids:"Cain, Abel, Seth; other sons and daughters",book:"Genesis 1–5",story:"The first man. He lived in Eden with Eve, disobeyed God's command concerning the forbidden tree, and was expelled from the garden."},
{t:"ot",n:"Eve",kids:"Cain, Abel, Seth; other sons and daughters",book:"Genesis 2–4",story:"The first woman and Adam's wife. She was deceived by the serpent and ate the forbidden fruit."},
{t:"ot",n:"Cain",kids:"Enoch",book:"Genesis 4",story:"The firstborn son of Adam and Eve. He murdered his brother Abel after becoming angry over their offerings."},
{t:"ot",n:"Abel",kids:"None recorded",book:"Genesis 4",story:"A keeper of sheep whose offering was regarded by God; he was murdered by his brother Cain."},
{t:"ot",n:"Seth",kids:"Enosh",book:"Genesis 4–5",story:"Born to Adam and Eve after Abel's death; his line continues toward Noah."},
{t:"ot",n:"Enoch",kids:"Methuselah; other sons and daughters",book:"Genesis 5",story:"A descendant of Seth who walked with God; Genesis says God took him."},
{t:"ot",n:"Methuselah",kids:"Lamech; other sons and daughters",book:"Genesis 5",story:"Enoch's son and Noah's grandfather; recorded as living 969 years."},
{t:"ot",n:"Noah",kids:"Shem, Ham, Japheth",book:"Genesis 5–10",story:"Built the ark at God's command and survived the Flood with his household."},
{t:"ot",n:"Abraham",kids:"Ishmael, Isaac, Zimran, Jokshan, Medan, Midian, Ishbak, Shuah",book:"Genesis 11–25",story:"Patriarch called by God, recipient of the covenant promises and father of Isaac."},
{t:"ot",n:"Sarah",kids:"Isaac",book:"Genesis 11–23",story:"Abraham's wife who gave birth to Isaac in old age according to God's promise."},
{t:"ot",n:"Hagar",kids:"Ishmael",book:"Genesis 16; 21",story:"Sarah's Egyptian servant and mother of Ishmael; she encountered the angel of the LORD in the wilderness."},
{t:"ot",n:"Ishmael",kids:"Nebaioth, Kedar, Adbeel, Mibsam, Mishma, Dumah, Massa, Hadad, Tema, Jetur, Naphish, Kedemah",book:"Genesis 16–17; 21; 25",story:"Abraham's son through Hagar, promised to become the father of twelve princes."},
{t:"ot",n:"Isaac",kids:"Esau, Jacob",book:"Genesis 17–35",story:"The promised son of Abraham and Sarah, nearly offered by Abraham, and later husband of Rebekah."},
{t:"ot",n:"Rebekah",kids:"Esau, Jacob",book:"Genesis 24–28",story:"Isaac's wife and mother of the twins Esau and Jacob; she helped Jacob receive Isaac's blessing."},
{t:"ot",n:"Esau",kids:"Eliphaz, Reuel, Jeush, Jalam, Korah",book:"Genesis 25–36",story:"Jacob's twin brother who sold his birthright and became associated with Edom."},
{t:"ot",n:"Jacob (Israel)",kids:"Reuben, Simeon, Levi, Judah, Dan, Naphtali, Gad, Asher, Issachar, Zebulun, Joseph, Benjamin; Dinah",book:"Genesis 25–50",story:"Son of Isaac, renamed Israel, and father of the family that became the tribes of Israel."},
{t:"ot",n:"Joseph",kids:"Manasseh, Ephraim",book:"Genesis 30; 37–50",story:"Sold into Egypt by his brothers, later rose to power and preserved his family during famine."},
{t:"ot",n:"Moses",kids:"Gershom, Eliezer",book:"Exodus–Deuteronomy",story:"Led Israel out of Egypt, received the Law at Sinai, and guided Israel through the wilderness."},
{t:"ot",n:"Aaron",kids:"Nadab, Abihu, Eleazar, Ithamar",book:"Exodus–Numbers",story:"Brother of Moses, spokesman for him, and Israel's first high priest."},
{t:"ot",n:"Miriam",kids:"None recorded",book:"Exodus; Numbers",story:"Sister of Moses and Aaron, called a prophetess, and led women in song after the crossing of the sea."},
{t:"ot",n:"Joshua",kids:"None recorded",book:"Exodus; Numbers; Deuteronomy; Joshua",story:"Moses' successor who led Israel across the Jordan and into Canaan."},
{t:"ot",n:"Rahab",kids:"Boaz in Matthew's genealogy",book:"Joshua 2; 6; Matthew 1",story:"Woman of Jericho who hid Israelite spies and was spared when the city fell."},
{t:"ot",n:"Deborah",kids:"None recorded",book:"Judges 4–5",story:"Prophetess and judge who summoned Barak and helped lead Israel during conflict with Sisera."},
{t:"ot",n:"Gideon",kids:"Seventy sons are mentioned; Abimelech is named",book:"Judges 6–9",story:"Judge called by God to defeat Midian with a greatly reduced army."},
{t:"ot",n:"Jephthah",kids:"One daughter is mentioned, unnamed",book:"Judges 11–12",story:"Rejected son of Gilead who became a judge and military leader; remembered for his tragic vow."},
{t:"ot",n:"Manoah",kids:"Samson",book:"Judges 13",story:"A man of Zorah whose unnamed wife received an angelic announcement that Samson would be born as a Nazirite."},
{t:"ot",n:"Samson",kids:"None recorded",book:"Judges 13–16",story:"Judge of extraordinary strength who fought the Philistines, was betrayed by Delilah, and died bringing down their temple."},
{t:"ot",n:"Naomi",kids:"Mahlon, Chilion",book:"Ruth",story:"Widow who returned to Bethlehem with Ruth after losing her husband and sons."},
{t:"ot",n:"Ruth",kids:"Obed",book:"Ruth",story:"Moabite widow loyal to Naomi who married Boaz and became an ancestor of David."},
{t:"ot",n:"Boaz",kids:"Obed",book:"Ruth",story:"Kinsman-redeemer who married Ruth and became great-grandfather of David."},
{t:"ot",n:"Elkanah",kids:"Samuel; other sons and daughters through Hannah",book:"1 Samuel 1–2",story:"Husband of Hannah and father of Samuel, who regularly went to worship at Shiloh."},
{t:"ot",n:"Hannah",kids:"Samuel; later three sons and two daughters",book:"1 Samuel 1–2",story:"Prayed earnestly for a son and dedicated Samuel to the LORD; later sang a famous prayer of thanksgiving."},
{t:"ot",n:"Eli",kids:"Hophni, Phinehas",book:"1 Samuel 1–4",story:"Priest at Shiloh who mentored Samuel; his sons acted wickedly and his house came under judgment."},
{t:"ot",n:"Samuel",kids:"Joel, Abijah",book:"1 Samuel",story:"Prophet and judge who anointed Saul and later David as kings."},
{t:"ot",n:"Saul",kids:"Jonathan, Abinadab/Ishvi, Malchi-shua, Ish-bosheth; Merab and Michal",book:"1 Samuel; 2 Samuel",story:"Israel's first king, eventually rejected for disobedience and consumed by jealousy toward David."},
{t:"ot",n:"Jonathan",kids:"Mephibosheth",book:"1 Samuel; 2 Samuel",story:"Saul's son and David's loyal friend who died in battle with his father."},
{t:"ot",n:"David",kids:"Amnon, Chileab/Daniel, Absalom, Adonijah, Shephatiah, Ithream, Shammua, Shobab, Nathan, Solomon and others; Tamar",book:"1–2 Samuel; 1 Kings; 1 Chronicles",story:"Shepherd who defeated Goliath and became king; established Jerusalem as capital and received a dynastic promise."},
{t:"ot",n:"Abigail",kids:"Chileab/Daniel by David",book:"1 Samuel 25; 2 Samuel 3",story:"Wise wife of Nabal who stopped David from bloodshed and later became David's wife."},
{t:"ot",n:"Nabal",kids:"None recorded",book:"1 Samuel 25",story:"Wealthy but harsh man who insulted David and later died after Abigail intervened."},
{t:"ot",n:"Abner",kids:"None recorded",book:"1–2 Samuel",story:"Commander of Saul's army who supported Ish-bosheth before transferring allegiance toward David; Joab killed him."},
{t:"ot",n:"Ish-bosheth",kids:"None recorded",book:"2 Samuel 2–4",story:"Son of Saul who ruled much of Israel in opposition to David for a short period."},
{t:"ot",n:"Mephibosheth",kids:"Mica",book:"2 Samuel 4; 9; 16; 19; 21",story:"Jonathan's disabled son whom David treated kindly for Jonathan's sake."},
{t:"ot",n:"Uriah the Hittite",kids:"None recorded",book:"2 Samuel 11",story:"Soldier and husband of Bathsheba whose death David arranged after committing adultery with Bathsheba."},
{t:"ot",n:"Joab",kids:"None recorded",book:"2 Samuel; 1 Kings; 1 Chronicles",story:"David's powerful military commander, known for both loyalty and ruthless violence."},
{t:"ot",n:"Ahithophel",kids:"A son is not named in his story; he is linked genealogically to Eliam",book:"2 Samuel 15–17",story:"David's counselor who defected to Absalom; his advice was frustrated by Hushai."},
{t:"ot",n:"Hushai",kids:"None recorded",book:"2 Samuel 15–17",story:"David's friend who infiltrated Absalom's court and undermined Ahithophel's counsel."},
{t:"ot",n:"Barzillai",kids:"Sons are referenced; Chimham is associated with him",book:"2 Samuel 17; 19",story:"An elderly wealthy supporter who supplied David during Absalom's rebellion."},
{t:"ot",n:"Adonijah",kids:"None recorded",book:"1 Kings 1–2",story:"Son of David who tried to claim the throne before Solomon was established as king."},
{t:"ot",n:"Solomon",kids:"Rehoboam is named",book:"1 Kings 1–11; 2 Chronicles 1–9",story:"Son of David renowned for wisdom; built the first Temple but later turned toward foreign gods."},
{t:"ot",n:"Rehoboam",kids:"Several sons are named in 2 Chronicles 11",book:"1 Kings 11–14; 2 Chronicles 9–12",story:"Solomon's son whose harsh policy contributed to the division of the kingdom."},
{t:"ot",n:"Elijah",kids:"None recorded",book:"1–2 Kings",story:"Prophet who opposed Ahab and Jezebel, confronted the prophets of Baal, and was taken up in a whirlwind."},
{t:"ot",n:"Elisha",kids:"None recorded",book:"1–2 Kings",story:"Successor of Elijah whose ministry included numerous miracles and counsel to kings."},
{t:"ot",n:"Ahab",kids:"Ahaziah, Joram/Jehoram; other sons",book:"1 Kings 16–22; 2 Kings",story:"King of Israel married to Jezebel; opposed Elijah and promoted Baal worship."},
{t:"ot",n:"Jezebel",kids:"Ahaziah, Joram/Jehoram, Athaliah",book:"1 Kings; 2 Kings",story:"Queen associated with Baal worship and persecution of God's prophets; later killed during Jehu's revolt."},
{t:"ot",n:"Naaman",kids:"None recorded",book:"2 Kings 5",story:"Aramean commander healed of leprosy after obeying Elisha's instruction to wash in the Jordan."},
{t:"ot",n:"Gehazi",kids:"Sons/descendants are not clearly recorded in his main story",book:"2 Kings 4–5; 8",story:"Elisha's servant who secretly took gifts from Naaman and was punished."},
{t:"ot",n:"Hazael",kids:"Ben-hadad is named as successor/son",book:"1 Kings 19; 2 Kings 8–13",story:"Aramean official who became king and later oppressed Israel."},
{t:"ot",n:"Jehu",kids:"Jehoahaz and descendants",book:"2 Kings 9–10",story:"Military commander anointed king who destroyed Ahab's dynasty and killed Jezebel."},
{t:"ot",n:"Athaliah",kids:"Ahaziah; other royal children are referenced",book:"2 Kings 11; 2 Chronicles 22–23",story:"Queen who seized Judah's throne and attempted to destroy the royal heirs."},
{t:"ot",n:"Jehoiada",kids:"Zechariah and other sons",book:"2 Kings 11–12; 2 Chronicles 22–24",story:"High priest who protected Joash, overthrew Athaliah, and restored covenant worship."},
{t:"ot",n:"Joash",kids:"Amaziah",book:"2 Kings 11–12; 2 Chronicles 22–24",story:"Hidden from Athaliah as a child and crowned king at age seven under Jehoiada's protection."},
{t:"ot",n:"Hezekiah",kids:"Manasseh",book:"2 Kings 18–20; 2 Chronicles 29–32; Isaiah 36–39",story:"King of Judah who trusted God during Sennacherib's invasion and enacted religious reforms."},
{t:"ot",n:"Sennacherib",kids:"Adrammelech, Sharezer, Esarhaddon",book:"2 Kings 18–19; 2 Chronicles 32; Isaiah 36–37",story:"Assyrian king who invaded Judah in Hezekiah's reign; Jerusalem was not captured."},
{t:"ot",n:"Rabshakeh",kids:"None recorded",book:"2 Kings 18–19; Isaiah 36–37",story:"Assyrian official who publicly challenged Hezekiah and mocked Judah's trust in God."},
{t:"ot",n:"Shalmaneser",kids:"None recorded in the Bible",book:"2 Kings 17:3–6; 18:9–11",story:"King of Assyria who came against Hoshea; Samaria was besieged and the northern kingdom fell to Assyria."},
{t:"ot",n:"Huldah",kids:"None recorded",book:"2 Kings 22; 2 Chronicles 34",story:"Prophetess consulted after the Book of the Law was found during Josiah's reign."},
{t:"ot",n:"Josiah",kids:"Johanan, Jehoiakim, Zedekiah, Shallum/Jehoahaz",book:"2 Kings 22–23; 2 Chronicles 34–35",story:"King of Judah who led major reforms after the Book of the Law was found."},
{t:"ot",n:"Baruch",kids:"None recorded",book:"Jeremiah 32; 36; 43; 45",story:"Jeremiah's scribe who wrote and read the prophet's words from a scroll."},
{t:"ot",n:"Ebed-melech",kids:"None recorded",book:"Jeremiah 38–39",story:"Cushite court official who courageously rescued Jeremiah from a cistern."},
{t:"ot",n:"Nebuchadnezzar",kids:"No children clearly named in the Bible as his own",book:"2 Kings; 2 Chronicles; Jeremiah; Daniel",story:"Babylonian king who conquered Jerusalem and features prominently in Daniel."},
{t:"ot",n:"Daniel",kids:"None recorded",book:"Daniel",story:"Jewish exile who served foreign kings, interpreted dreams, and survived the lions' den."},
{t:"ot",n:"Shadrach",kids:"None recorded",book:"Daniel 1–3",story:"One of Daniel's three companions who survived the fiery furnace after refusing idolatry."},
{t:"ot",n:"Meshach",kids:"None recorded",book:"Daniel 1–3",story:"One of Daniel's companions preserved in the fiery furnace."},
{t:"ot",n:"Abednego",kids:"None recorded",book:"Daniel 1–3",story:"One of Daniel's companions preserved in the fiery furnace."},
{t:"ot",n:"Esther",kids:"None recorded",book:"Esther",story:"Jewish queen of Persia who risked her life to intervene against a plot to destroy her people."},
{t:"ot",n:"Mordecai",kids:"None recorded",book:"Esther",story:"Esther's older relative and guardian who uncovered a plot and opposed Haman."},
{t:"ot",n:"Ezra",kids:"None recorded",book:"Ezra; Nehemiah",story:"Priest and scribe who taught the Law after the exile."},
{t:"ot",n:"Nehemiah",kids:"None recorded",book:"Nehemiah",story:"Governor who led the rebuilding of Jerusalem's walls despite opposition."},
{t:"ot",n:"Noadiah",kids:"None recorded",book:"Nehemiah 6:14",story:"A prophetess mentioned briefly among those who tried to intimidate Nehemiah."},
{t:"ot",n:"Zerubbabel",kids:"Meshullam, Hananiah; Shelomith is named as a daughter",book:"Ezra; Haggai; Zechariah; 1 Chronicles",story:"Davidic descendant and governor involved in rebuilding the Temple after exile."},
{t:"ot",n:"Job",kids:"Seven sons and three daughters initially; later seven sons and three daughters, with Jemimah, Keziah and Keren-happuch named",book:"Job",story:"Righteous man who endured catastrophic suffering and wrestled with questions of justice and faith."},

{t:"nt",n:"Zechariah",kids:"John the Baptist",book:"Luke 1",story:"Priest who received Gabriel's announcement of John's birth and was temporarily unable to speak after doubting."},
{t:"nt",n:"Elizabeth",kids:"John the Baptist",book:"Luke 1",story:"Wife of Zechariah and relative of Mary who conceived John in old age."},
{t:"nt",n:"John the Baptist",kids:"None recorded",book:"Matthew; Mark; Luke; John",story:"Prophetic forerunner of Jesus who preached repentance and baptized in the Jordan."},
{t:"nt",n:"Mary",kids:"Jesus; Jesus' brothers and sisters are mentioned, with interpretation varying by tradition",book:"Matthew; Mark; Luke; John; Acts",story:"Mother of Jesus, chosen to conceive by the Holy Spirit and present at key moments in Jesus' life."},
{t:"nt",n:"Joseph",kids:"Jesus was regarded as his son; family relationships are interpreted differently across traditions",book:"Matthew 1–2; Luke 1–2",story:"Mary's husband and Davidic descendant who protected the family after angelic guidance."},
{t:"nt",n:"Jesus Christ",kids:"None",book:"Matthew–Revelation",story:"Central figure of the New Testament: teacher, Messiah and Son of God in Christianity, crucified and raised from the dead."},
{t:"nt",n:"Peter",kids:"None recorded",book:"Gospels; Acts; Galatians; 1–2 Peter",story:"A leading apostle who denied Jesus three times, was restored, and became prominent in the early church."},
{t:"nt",n:"Andrew",kids:"None recorded",book:"Matthew; Mark; Luke; John; Acts",story:"Peter's brother and one of the first disciples of Jesus."},
{t:"nt",n:"James son of Zebedee",kids:"None recorded",book:"Gospels; Acts 12",story:"Brother of John and member of Jesus' inner circle; executed under Herod Agrippa I."},
{t:"nt",n:"John son of Zebedee",kids:"None recorded",book:"Gospels; Acts",story:"Brother of James and prominent apostle present at several major events in Jesus' ministry."},
{t:"nt",n:"Matthew",kids:"None recorded",book:"Matthew; Mark; Luke; Acts",story:"Tax collector called by Jesus to become one of the Twelve."},
{t:"nt",n:"Thomas",kids:"None recorded",book:"Matthew; Mark; Luke; John; Acts",story:"Apostle who initially doubted reports of the resurrection before encountering the risen Jesus."},
{t:"nt",n:"Judas Iscariot",kids:"None recorded",book:"Matthew; Mark; Luke; John; Acts",story:"One of the Twelve who betrayed Jesus and later died after Jesus was condemned."},
{t:"nt",n:"Mary Magdalene",kids:"None recorded",book:"Matthew; Mark; Luke; John",story:"Follower of Jesus who witnessed the crucifixion and became an early witness of the empty tomb and risen Christ."},
{t:"nt",n:"Martha",kids:"None recorded",book:"Luke 10; John 11–12",story:"Sister of Mary and Lazarus who welcomed Jesus and confessed faith in him before Lazarus was raised."},
{t:"nt",n:"Mary of Bethany",kids:"None recorded",book:"Luke 10; John 11–12",story:"Sister of Martha and Lazarus who listened at Jesus' feet and later anointed him with perfume."},
{t:"nt",n:"Lazarus",kids:"None recorded",book:"John 11–12",story:"Friend of Jesus and brother of Mary and Martha whom Jesus raised from the dead."},
{t:"nt",n:"Zacchaeus",kids:"None recorded",book:"Luke 19",story:"Chief tax collector who climbed a sycamore tree to see Jesus and responded with repentance and restitution."},
{t:"nt",n:"Stephen",kids:"None recorded",book:"Acts 6–8",story:"Early church servant and powerful witness who was stoned, becoming the first Christian martyr described in Acts."},
{t:"nt",n:"Paul",kids:"None recorded",book:"Acts; Romans–Philemon; 2 Peter",story:"Former persecutor who encountered Jesus on the Damascus road and became a major missionary and apostle."},
{t:"nt",n:"Barnabas",kids:"None recorded",book:"Acts; Galatians; 1 Corinthians; Colossians",story:"Early Christian leader known for encouragement who supported Paul and later traveled with him."},
{t:"nt",n:"Timothy",kids:"None recorded",book:"Acts; Paul's letters; 1–2 Timothy",story:"Younger coworker of Paul, son of Eunice and grandson of Lois."},
{t:"nt",n:"Priscilla",kids:"None recorded",book:"Acts; Romans; 1 Corinthians; 2 Timothy",story:"Christian teacher and coworker of Paul who, with Aquila, instructed Apollos more accurately."},
{t:"nt",n:"Aquila",kids:"None recorded",book:"Acts; Romans; 1 Corinthians; 2 Timothy",story:"Husband of Priscilla, tentmaker and coworker of Paul."},
{t:"nt",n:"Apollos",kids:"None recorded",book:"Acts 18; 1 Corinthians",story:"Eloquent Jewish teacher from Alexandria who was instructed more accurately by Priscilla and Aquila."},
{t:"nt",n:"Lydia",kids:"None individually recorded",book:"Acts 16",story:"Seller of purple cloth at Philippi who became a believer and hosted Paul and his companions."},
{t:"nt",n:"Cornelius",kids:"Household mentioned; children not individually named",book:"Acts 10–11",story:"Roman centurion whose household received the Holy Spirit after Peter preached to them."},
{t:"nt",n:"Pontius Pilate",kids:"None mentioned",book:"Matthew; Mark; Luke; John; Acts; 1 Timothy",story:"Roman governor who presided over Jesus' trial and authorized the crucifixion."},
{t:"nt",n:"Anna",kids:"None recorded",book:"Luke 2:36–38",story:"Elderly prophetess who worshiped at the Temple and spoke about Jesus when he was presented there."}
];

// Deep expansion: minor narratives, genealogies, Acts and Pauline greetings
DATA.push(
{"t":"ot","n":"Japheth","kids":"Gomer, Magog, Madai, Javan, Tubal, Meshech, Tiras","book":"Genesis 5; 9–10; 1 Chronicles 1","story":"One of Noah's sons; Genesis 10 traces peoples through his seven named sons."},
{"t":"ot","n":"Shem","kids":"Elam, Asshur, Arphaxad, Lud, Aram","book":"Genesis 5; 9–11; 1 Chronicles 1","story":"Noah's son whose line is traced toward Abraham."},
{"t":"ot","n":"Ham","kids":"Cush, Mizraim, Put, Canaan","book":"Genesis 5; 9–10; 1 Chronicles 1","story":"Noah's son and father of four named sons in the Table of Nations."},
{"t":"ot","n":"Gomer","kids":"Ashkenaz, Riphath, Togarmah","book":"Genesis 10; 1 Chronicles 1","story":"Son of Japheth and ancestor of peoples named after the Flood."},
{"t":"ot","n":"Javan","kids":"Elishah, Tarshish, Kittim, Dodanim/Rodanim","book":"Genesis 10; 1 Chronicles 1","story":"Son of Japheth whose descendants are linked with maritime peoples."},
{"t":"ot","n":"Cush","kids":"Seba, Havilah, Sabtah, Raamah, Sabteca; Nimrod","book":"Genesis 10; 1 Chronicles 1","story":"Son of Ham and father of Nimrod and several named peoples."},
{"t":"ot","n":"Nimrod","kids":"None recorded","book":"Genesis 10:8–12; 1 Chronicles 1:10","story":"A mighty warrior and hunter associated with early kingdoms including Babel."},
{"t":"ot","n":"Terah","kids":"Abram, Nahor, Haran","book":"Genesis 11","story":"Father of Abram, Nahor and Haran; moved from Ur and settled in Haran."},
{"t":"ot","n":"Haran","kids":"Lot, Milcah, Iscah","book":"Genesis 11","story":"Brother of Abram and father of Lot, Milcah and Iscah."},
{"t":"ot","n":"Lot","kids":"Two daughters; sons-in-law mentioned","book":"Genesis 11–14; 18–19","story":"Abraham's nephew who lived near Sodom and escaped its destruction."},
{"t":"ot","n":"Melchizedek","kids":"None recorded","book":"Genesis 14; Psalm 110; Hebrews 5–7","story":"King of Salem and priest of God Most High who blessed Abram."},
{"t":"ot","n":"Nahor","kids":"Uz, Buz, Kemuel, Chesed, Hazo, Pildash, Jidlaph, Bethuel; others","book":"Genesis 11; 22","story":"Abraham's brother whose line includes Bethuel, Rebekah and Laban."},
{"t":"ot","n":"Bethuel","kids":"Laban, Rebekah","book":"Genesis 22; 24; 25","story":"Father of Rebekah and Laban."},
{"t":"ot","n":"Laban","kids":"Leah, Rachel; sons mentioned","book":"Genesis 24; 27–31","story":"Jacob's uncle and employer who repeatedly bargained with and deceived him."},
{"t":"ot","n":"Leah","kids":"Reuben, Simeon, Levi, Judah, Issachar, Zebulun; Dinah","book":"Genesis 29–35","story":"Jacob's first wife and mother of six sons and Dinah."},
{"t":"ot","n":"Rachel","kids":"Joseph, Benjamin","book":"Genesis 29–35","story":"Jacob's beloved wife and mother of Joseph and Benjamin."},
{"t":"ot","n":"Bilhah","kids":"Dan, Naphtali","book":"Genesis 29–35","story":"Rachel's servant who bore Dan and Naphtali to Jacob."},
{"t":"ot","n":"Zilpah","kids":"Gad, Asher","book":"Genesis 29–35","story":"Leah's servant who bore Gad and Asher to Jacob."},
{"t":"ot","n":"Judah","kids":"Er, Onan, Shelah, Perez, Zerah","book":"Genesis 29; 37–38; 43–49","story":"Jacob's son whose line continues through Perez toward David."},
{"t":"ot","n":"Tamar (Judah's daughter-in-law)","kids":"Perez, Zerah","book":"Genesis 38; Ruth 4; Matthew 1","story":"Widow who secured offspring from Judah after being denied Shelah."},
{"t":"ot","n":"Dinah","kids":"None recorded","book":"Genesis 30; 34","story":"Daughter of Jacob and Leah whose story triggered Simeon and Levi's violent revenge."},
{"t":"ot","n":"Reuben","kids":"Hanoch, Pallu, Hezron, Carmi","book":"Genesis; Exodus 6; Numbers 26","story":"Jacob's firstborn who tried to rescue Joseph from his brothers."},
{"t":"ot","n":"Jethro","kids":"Zipporah and other daughters","book":"Exodus 2–4; 18","story":"Moses' father-in-law and priest of Midian who advised Moses about delegated leadership."},
{"t":"ot","n":"Zipporah","kids":"Gershom, Eliezer","book":"Exodus 2; 4; 18","story":"Moses' wife and daughter of Jethro."},
{"t":"ot","n":"Korah","kids":"Sons of Korah survived","book":"Numbers 16; 26","story":"Levite who led a rebellion against Moses and Aaron."},
{"t":"ot","n":"Dathan","kids":"Household mentioned","book":"Numbers 16; 26","story":"Reubenite who joined Korah's rebellion."},
{"t":"ot","n":"Abiram","kids":"Household mentioned","book":"Numbers 16; 26","story":"Reubenite who joined Korah's rebellion."},
{"t":"ot","n":"Balaam","kids":"None recorded","book":"Numbers 22–24; 31","story":"Diviner hired by Balak to curse Israel but compelled to bless them."},
{"t":"ot","n":"Balak","kids":"None recorded","book":"Numbers 22–24","story":"King of Moab who hired Balaam against Israel."},
{"t":"ot","n":"Phinehas","kids":"Abishua","book":"Numbers 25; 31; Joshua 22","story":"Aaron's grandson whose zeal stopped a plague during the Baal-peor crisis."},
{"t":"ot","n":"Caleb","kids":"Acsah; other children in genealogies","book":"Numbers 13–14; Joshua 14–15","story":"Faithful spy who later received Hebron."},
{"t":"ot","n":"Achan","kids":"Sons and daughters mentioned","book":"Joshua 7","story":"Took devoted items from Jericho, bringing defeat on Israel at Ai."},
{"t":"ot","n":"Othniel","kids":"None clearly named","book":"Joshua 15; Judges 1; 3","story":"Captured Kiriath-sepher, married Acsah, and became a judge."},
{"t":"ot","n":"Ehud","kids":"None recorded","book":"Judges 3","story":"Left-handed judge who killed Eglon king of Moab."},
{"t":"ot","n":"Shamgar","kids":"None recorded","book":"Judges 3:31; 5:6","story":"Judge who struck down six hundred Philistines with an oxgoad."},
{"t":"ot","n":"Barak","kids":"None recorded","book":"Judges 4–5","story":"Military leader summoned by Deborah against Sisera."},
{"t":"ot","n":"Sisera","kids":"None recorded","book":"Judges 4–5","story":"Commander of Jabin's army who was killed by Jael."},
{"t":"ot","n":"Jael","kids":"None recorded","book":"Judges 4–5","story":"Killed Sisera with a tent peg after giving him shelter."},
{"t":"ot","n":"Abimelech","kids":"None recorded","book":"Judges 8–9","story":"Gideon's son who killed most of his brothers and made himself king."},
{"t":"ot","n":"Tola","kids":"None named","book":"Judges 10:1–2","story":"Judge from Issachar who judged Israel twenty-three years."},
{"t":"ot","n":"Jair","kids":"Thirty sons","book":"Judges 10:3–5","story":"Judge whose thirty sons rode thirty donkeys and controlled thirty towns."},
{"t":"ot","n":"Ibzan","kids":"Thirty sons and thirty daughters","book":"Judges 12:8–10","story":"Judge from Bethlehem with sixty children."},
{"t":"ot","n":"Elon","kids":"None recorded","book":"Judges 12:11–12","story":"Zebulunite judge who judged Israel ten years."},
{"t":"ot","n":"Abdon","kids":"Forty sons and thirty grandsons","book":"Judges 12:13–15","story":"Judge whose descendants rode seventy donkeys."},
{"t":"ot","n":"Delilah","kids":"None recorded","book":"Judges 16","story":"Woman who learned Samson's secret and delivered him to the Philistines."},
{"t":"ot","n":"Goliath","kids":"None recorded","book":"1 Samuel 17","story":"Philistine champion from Gath killed by David."},
{"t":"ot","n":"Hophni","kids":"None recorded","book":"1 Samuel 1–4","story":"One of Eli's corrupt priestly sons."},
{"t":"ot","n":"Phinehas son of Eli","kids":"Ichabod","book":"1 Samuel 1–4","story":"Eli's son who died when the ark was captured."},
{"t":"ot","n":"Ichabod","kids":"None recorded","book":"1 Samuel 4; 14","story":"Son of Phinehas, named after the disaster surrounding the ark's capture."},
{"t":"ot","n":"Bathsheba","kids":"Unnamed first child; Solomon, Shammua/Shimea, Shobab, Nathan","book":"2 Samuel 11–12; 1 Kings 1–2","story":"Wife of Uriah who later became David's wife and mother of Solomon."},
{"t":"ot","n":"Nathan the prophet","kids":"None recorded","book":"2 Samuel 7; 12; 1 Kings 1","story":"Prophet who confronted David and supported Solomon's succession."},
{"t":"ot","n":"Absalom","kids":"Three sons and a daughter mentioned; Tamar named","book":"2 Samuel 13–19","story":"David's son who rebelled against him and died during the revolt."},
{"t":"ot","n":"Amnon","kids":"None recorded","book":"2 Samuel 13","story":"David's firstborn who violated Tamar and was killed on Absalom's orders."},
{"t":"ot","n":"Tamar daughter of David","kids":"None recorded","book":"2 Samuel 13","story":"David's daughter and Absalom's sister, violated by Amnon."},
{"t":"ot","n":"Micaiah son of Imlah","kids":"None recorded","book":"1 Kings 22; 2 Chronicles 18","story":"Prophet who foretold Ahab's defeat despite pressure from other prophets."},
{"t":"ot","n":"Isaiah","kids":"Shear-jashub, Maher-shalal-hash-baz","book":"2 Kings 19–20; Isaiah","story":"Prophet who counseled kings including Ahaz and Hezekiah."},
{"t":"ot","n":"Jeremiah","kids":"None recorded","book":"Jeremiah","story":"Prophet who warned Judah before Jerusalem's fall."},
{"t":"ot","n":"Ezekiel","kids":"None recorded","book":"Ezekiel","story":"Priest-prophet among the exiles who saw visions of God's glory."},
{"t":"ot","n":"Ahasuerus/Xerxes","kids":"None named in Esther","book":"Esther","story":"Persian king whose court forms the setting of Esther."},
{"t":"ot","n":"Vashti","kids":"None recorded","book":"Esther 1","story":"Queen removed after refusing the king's summons."},
{"t":"ot","n":"Haman","kids":"Parshandatha, Dalphon, Aspatha, Poratha, Adalia, Aridatha, Parmashta, Arisai, Aridai, Vaizatha","book":"Esther 3–9","story":"Official who plotted to destroy the Jews and was executed on the gallows prepared for Mordecai."},
{"t":"ot","n":"Hammedatha","kids":"Haman","book":"Esther 3; 8–9","story":"Father of Haman."},
{"t":"ot","n":"Parshandatha","kids":"None recorded","book":"Esther 9:7","story":"One of Haman's ten sons."},
{"t":"ot","n":"Dalphon","kids":"None recorded","book":"Esther 9:7","story":"One of Haman's ten sons."},
{"t":"ot","n":"Aspatha","kids":"None recorded","book":"Esther 9:7","story":"One of Haman's ten sons."},
{"t":"ot","n":"Poratha","kids":"None recorded","book":"Esther 9:8","story":"One of Haman's ten sons."},
{"t":"ot","n":"Adalia","kids":"None recorded","book":"Esther 9:8","story":"One of Haman's ten sons."},
{"t":"ot","n":"Aridatha","kids":"None recorded","book":"Esther 9:8","story":"One of Haman's ten sons."},
{"t":"ot","n":"Parmashta","kids":"None recorded","book":"Esther 9:9","story":"One of Haman's ten sons."},
{"t":"ot","n":"Arisai","kids":"None recorded","book":"Esther 9:9","story":"One of Haman's ten sons."},
{"t":"ot","n":"Aridai","kids":"None recorded","book":"Esther 9:9","story":"One of Haman's ten sons."},
{"t":"ot","n":"Vaizatha","kids":"None recorded","book":"Esther 9:9","story":"One of Haman's ten sons."},
{"t":"nt","n":"Herod the Great","kids":"Archelaus, Herod Antipas, Philip and others","book":"Matthew 2","story":"King who sought to kill the infant Jesus."},
{"t":"nt","n":"Nicodemus","kids":"None recorded","book":"John 3; 7; 19","story":"Pharisee who came to Jesus by night and later helped bury him."},
{"t":"nt","n":"Joseph of Arimathea","kids":"None recorded","book":"Matthew 27; Mark 15; Luke 23; John 19","story":"Council member who requested Jesus' body and placed it in a tomb."},
{"t":"nt","n":"Jairus","kids":"One unnamed daughter","book":"Mark 5; Luke 8","story":"Synagogue leader whose daughter Jesus raised."},
{"t":"nt","n":"Bartimaeus","kids":"None recorded","book":"Mark 10","story":"Blind beggar near Jericho who received his sight."},
{"t":"nt","n":"Joanna","kids":"None recorded","book":"Luke 8; 24","story":"Wife of Chuza who supported Jesus' ministry."},
{"t":"nt","n":"Susanna","kids":"None recorded","book":"Luke 8:3","story":"Woman who supported Jesus and the Twelve."},
{"t":"nt","n":"Cleopas","kids":"None recorded","book":"Luke 24","story":"Disciple who encountered the risen Jesus on the road to Emmaus."},
{"t":"nt","n":"Matthias","kids":"None recorded","book":"Acts 1","story":"Chosen to replace Judas Iscariot among the Twelve."},
{"t":"nt","n":"Joseph Barsabbas Justus","kids":"None recorded","book":"Acts 1:23","story":"The other candidate considered with Matthias to replace Judas."},
{"t":"nt","n":"Ananias of Damascus","kids":"None recorded","book":"Acts 9; 22","story":"Disciple sent to restore Saul's sight."},
{"t":"nt","n":"Tabitha/Dorcas","kids":"None recorded","book":"Acts 9","story":"Believer known for good works whom Peter raised from the dead."},
{"t":"nt","n":"Agabus","kids":"None recorded","book":"Acts 11; 21","story":"Prophet who predicted famine and Paul's imprisonment."},
{"t":"nt","n":"Sergius Paulus","kids":"None recorded","book":"Acts 13","story":"Roman proconsul of Cyprus who believed after hearing Paul."},
{"t":"nt","n":"Elymas/Bar-Jesus","kids":"None recorded","book":"Acts 13","story":"Magician who opposed Paul and was temporarily blinded."},
{"t":"nt","n":"Silas/Silvanus","kids":"None recorded","book":"Acts 15–18; 2 Corinthians; 1 Thessalonians; 1 Peter","story":"Paul's missionary companion and fellow prisoner at Philippi."},
{"t":"nt","n":"Luke","kids":"None recorded","book":"Colossians 4; Philemon; 2 Timothy 4","story":"Beloved physician and coworker of Paul."},
{"t":"nt","n":"Mark/John Mark","kids":"None recorded","book":"Acts 12–15; Colossians 4; Philemon; 2 Timothy 4","story":"Coworker related to Barnabas who later became useful to Paul."},
{"t":"nt","n":"Jason","kids":"None recorded","book":"Acts 17; Romans 16:21","story":"Believer in Thessalonica who hosted Paul and Silas."},
{"t":"nt","n":"Crispus","kids":"Household believed","book":"Acts 18; 1 Corinthians 1","story":"Synagogue ruler in Corinth who believed."},
{"t":"nt","n":"Eutychus","kids":"None recorded","book":"Acts 20","story":"Young man who fell from a window during Paul's speech and was restored alive."},
{"t":"nt","n":"Philip the Evangelist","kids":"Four unmarried daughters who prophesied","book":"Acts 6; 8; 21","story":"Evangelist who preached in Samaria and to the Ethiopian official."},
{"t":"nt","n":"Felix","kids":"None named in Acts","book":"Acts 23–24","story":"Roman governor who kept Paul imprisoned for two years."},
{"t":"nt","n":"Drusilla","kids":"None named in Acts","book":"Acts 24","story":"Jewish wife of Felix who heard Paul speak."},
{"t":"nt","n":"Festus","kids":"None recorded","book":"Acts 24–26","story":"Governor who heard Paul's case after Felix."},
{"t":"nt","n":"Agrippa II","kids":"None recorded","book":"Acts 25–26","story":"King before whom Paul gave a major defense."},
{"t":"nt","n":"Bernice","kids":"None recorded","book":"Acts 25–26","story":"Sister of Agrippa II who appeared at Paul's hearing."},
{"t":"nt","n":"Phoebe","kids":"None recorded","book":"Romans 16:1–2","story":"Believer from Cenchreae commended by Paul as a servant/deacon and benefactor."},
{"t":"nt","n":"Epaenetus","kids":"None recorded","book":"Romans 16:5","story":"Beloved believer described as among the first converts in Asia."},
{"t":"nt","n":"Mary of Romans 16","kids":"None recorded","book":"Romans 16:6","story":"Christian woman whom Paul says worked very hard."},
{"t":"nt","n":"Andronicus","kids":"None recorded","book":"Romans 16:7","story":"Paul's kinsman/fellow Jew and fellow prisoner, greeted with Junia."},
{"t":"nt","n":"Junia","kids":"None recorded","book":"Romans 16:7","story":"Early Christian greeted with Andronicus and described with apostolic esteem."},
{"t":"nt","n":"Ampliatus","kids":"None recorded","book":"Romans 16:8","story":"Christian whom Paul calls beloved in the Lord."},
{"t":"nt","n":"Urbanus","kids":"None recorded","book":"Romans 16:9","story":"Paul's fellow worker in Christ."},
{"t":"nt","n":"Stachys","kids":"None recorded","book":"Romans 16:9","story":"Believer whom Paul calls beloved."},
{"t":"nt","n":"Apelles","kids":"None recorded","book":"Romans 16:10","story":"Christian described as approved/tested in Christ."},
{"t":"nt","n":"Herodion","kids":"None recorded","book":"Romans 16:11","story":"Paul's kinsman/fellow Jew greeted in Romans."},
{"t":"nt","n":"Tryphena","kids":"None recorded","book":"Romans 16:12","story":"Christian woman described as a worker in the Lord."},
{"t":"nt","n":"Tryphosa","kids":"None recorded","book":"Romans 16:12","story":"Christian woman greeted with Tryphena."},
{"t":"nt","n":"Persis","kids":"None recorded","book":"Romans 16:12","story":"Beloved woman who worked very hard in the Lord."},
{"t":"nt","n":"Rufus","kids":"None recorded","book":"Romans 16:13","story":"Believer called chosen in the Lord; his mother is also warmly greeted."},
{"t":"nt","n":"Asyncritus","kids":"None recorded","book":"Romans 16:14","story":"Believer greeted with Phlegon, Hermes, Patrobas and Hermas."},
{"t":"nt","n":"Phlegon","kids":"None recorded","book":"Romans 16:14","story":"Believer greeted in Romans 16."},
{"t":"nt","n":"Hermes","kids":"None recorded","book":"Romans 16:14","story":"Christian greeted in Romans 16."},
{"t":"nt","n":"Patrobas","kids":"None recorded","book":"Romans 16:14","story":"Christian greeted in Romans 16."},
{"t":"nt","n":"Hermas","kids":"None recorded","book":"Romans 16:14","story":"Christian greeted in Romans 16."},
{"t":"nt","n":"Philologus","kids":"None recorded","book":"Romans 16:15","story":"Christian greeted with Julia, Nereus, Olympas and others."},
{"t":"nt","n":"Julia","kids":"None recorded","book":"Romans 16:15","story":"Christian woman greeted by Paul."},
{"t":"nt","n":"Nereus","kids":"A sister is mentioned","book":"Romans 16:15","story":"Christian greeted together with his sister."},
{"t":"nt","n":"Olympas","kids":"None recorded","book":"Romans 16:15","story":"Christian greeted by Paul."},
{"t":"nt","n":"Tertius","kids":"None recorded","book":"Romans 16:22","story":"The scribe who wrote Romans and inserted his own greeting."},
{"t":"nt","n":"Gaius","kids":"None recorded","book":"Romans 16:23; 1 Corinthians 1","story":"Paul's host and host of the whole church."},
{"t":"nt","n":"Erastus","kids":"None recorded","book":"Romans 16:23; 2 Timothy 4:20","story":"City official associated with Corinth."},
{"t":"nt","n":"Quartus","kids":"None recorded","book":"Romans 16:23","story":"Christian called 'the brother' who sends greetings."},
{"t":"nt","n":"Sosthenes","kids":"None recorded","book":"Acts 18:17; 1 Corinthians 1:1","story":"A Sosthenes joins Paul's greeting in 1 Corinthians; Acts also names a synagogue ruler of this name."},
{"t":"nt","n":"Chloe","kids":"None recorded","book":"1 Corinthians 1:11","story":"Woman whose people reported Corinthian quarrels to Paul."},
{"t":"nt","n":"Stephanas","kids":"Household mentioned","book":"1 Corinthians 1:16; 16:15–18","story":"Head of a household among the first converts in Achaia."},
{"t":"nt","n":"Fortunatus","kids":"None recorded","book":"1 Corinthians 16:17","story":"Christian who visited Paul with Stephanas and Achaicus."},
{"t":"nt","n":"Achaicus","kids":"None recorded","book":"1 Corinthians 16:17","story":"Christian who visited Paul with Stephanas and Fortunatus."},
{"t":"nt","n":"Titus","kids":"None recorded","book":"2 Corinthians; Galatians; Titus; 2 Timothy","story":"Gentile coworker entrusted with ministry in Corinth and Crete."},
{"t":"nt","n":"Epaphroditus","kids":"None recorded","book":"Philippians 2; 4","story":"Philippian messenger who served Paul and became seriously ill."},
{"t":"nt","n":"Euodia","kids":"None recorded","book":"Philippians 4:2–3","story":"Christian woman urged to agree in the Lord with Syntyche."},
{"t":"nt","n":"Syntyche","kids":"None recorded","book":"Philippians 4:2–3","story":"Christian woman urged to reconcile with Euodia."},
{"t":"nt","n":"Clement","kids":"None recorded","book":"Philippians 4:3","story":"Coworker named among those who labored with Paul."},
{"t":"nt","n":"Epaphras","kids":"None recorded","book":"Colossians 1; 4; Philemon","story":"Coworker who taught the Colossians and prayed intensely for them."},
{"t":"nt","n":"Tychicus","kids":"None recorded","book":"Acts 20; Ephesians 6; Colossians 4; 2 Timothy 4; Titus 3","story":"Trusted messenger repeatedly sent by Paul."},
{"t":"nt","n":"Onesimus","kids":"None recorded","book":"Colossians 4; Philemon","story":"Man connected to Philemon whom Paul calls a beloved brother."},
{"t":"nt","n":"Aristarchus","kids":"None recorded","book":"Acts 19–20; 27; Colossians 4; Philemon","story":"Macedonian coworker who traveled with Paul."},
{"t":"nt","n":"Demas","kids":"None recorded","book":"Colossians 4; Philemon; 2 Timothy 4","story":"Coworker who later deserted Paul."},
{"t":"nt","n":"Nympha","kids":"None recorded","book":"Colossians 4:15","story":"Christian associated with a house church in Laodicea."},
{"t":"nt","n":"Archippus","kids":"None recorded","book":"Colossians 4:17; Philemon 2","story":"Coworker urged to complete his ministry."},
{"t":"nt","n":"Philemon","kids":"None recorded","book":"Philemon","story":"Recipient of Paul's appeal concerning Onesimus."},
{"t":"nt","n":"Apphia","kids":"None recorded","book":"Philemon 2","story":"Christian woman addressed with Philemon and Archippus."},
{"t":"nt","n":"Lois","kids":"Eunice","book":"2 Timothy 1:5","story":"Timothy's grandmother, remembered for sincere faith."},
{"t":"nt","n":"Eunice","kids":"Timothy","book":"Acts 16:1; 2 Timothy 1:5","story":"Timothy's Jewish mother."},
{"t":"nt","n":"Onesiphorus","kids":"Household mentioned","book":"2 Timothy 1; 4","story":"Believer praised for refreshing Paul and searching for him in Rome."},
{"t":"nt","n":"Carpus","kids":"None recorded","book":"2 Timothy 4:13","story":"Man at Troas with whom Paul left a cloak, books and parchments."},
{"t":"nt","n":"Eubulus","kids":"None recorded","book":"2 Timothy 4:21","story":"Christian who sends greetings to Timothy."},
{"t":"nt","n":"Pudens","kids":"None recorded","book":"2 Timothy 4:21","story":"Christian who sends greetings to Timothy."},
{"t":"nt","n":"Linus","kids":"None recorded","book":"2 Timothy 4:21","story":"Christian named among those sending greetings to Timothy."},
{"t":"nt","n":"Claudia","kids":"None recorded","book":"2 Timothy 4:21","story":"Christian woman named among those sending greetings."},
{"t":"nt","n":"Zenas","kids":"None recorded","book":"Titus 3:13","story":"Lawyer/expert in the law whom Titus is asked to help."},
{"t":"nt","n":"Artemas","kids":"None recorded","book":"Titus 3:12","story":"Coworker Paul considered sending to Titus."}
);

const modeNames={ot:"Old Testament",nt:"New Testament",mixed:"Mixed Bible",hard:"Hard Mode"};
let selectedMode="ot", quiz=[], idx=0, score=0, startTime=0, tick=null, locked=false;

const hardNames = new Set(["Shalmaneser","Manoah","Noadiah","Rabshakeh","Ebed-melech","Barzillai","Ahithophel","Hushai","Gehazi","Hazael","Jehoiada","Ish-bosheth","Abner","Nabal","Cornelius","Apollos","Anna","Priscilla","Aquila","Lydia"]);

document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".mode").forEach(x=>x.classList.remove("selected"));
 b.classList.add("selected"); selectedMode=b.dataset.mode;
});

/* ===== ROTATION ENGINE (full-pool shuffle bag) =====
   Per-pool state persisted in localStorage:
     remaining : shuffled ids not yet shown this cycle
     seen      : ids already shown this cycle (cycle history only)
     recent    : last ids shown (used only to keep the start of a new cycle fresh)
     inflight  : ids dealt to the current game but not yet displayed
   The master question database is never modified or filtered by history. */
function shuffle(a){const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
const Rotation=(function(){
 const KEY="bibleQuizRotation_v2", RECENT_MAX=60;
 let state=null;
 const arr=x=>Array.isArray(x)?x.filter(v=>typeof v==="string"):[];
 function load(){
  if(state)return state;
  let s=null;try{s=JSON.parse(localStorage.getItem(KEY));}catch(e){}
  state={bags:{}};
  if(s&&typeof s==="object"&&s.bags&&typeof s.bags==="object"){
   Object.keys(s.bags).forEach(k=>{const b=s.bags[k]||{};state.bags[k]={remaining:arr(b.remaining),seen:arr(b.seen),recent:arr(b.recent),inflight:arr(b.inflight)};});
  }
  return state;
 }
 function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
 function bagFor(key){const s=load();return s.bags[key]||(s.bags[key]={remaining:[],seen:[],recent:[],inflight:[]});}
 // Reconcile stored history with the current eligible pool (handles added/removed questions).
 function sync(bag,ids){
  const valid=new Set(ids),rem=new Set(),seen=new Set();
  bag.remaining=bag.remaining.filter(i=>valid.has(i)&&!rem.has(i)&&rem.add(i));
  bag.seen=bag.seen.filter(i=>valid.has(i)&&!rem.has(i)&&!seen.has(i)&&seen.add(i));
  bag.recent=bag.recent.filter(i=>valid.has(i));
  bag.inflight=bag.inflight.filter(i=>valid.has(i));
  ids.filter(i=>!rem.has(i)&&!seen.has(i)).forEach(i=>bag.remaining.splice(Math.floor(Math.random()*(bag.remaining.length+1)),0,i));
 }
 // Questions dealt but never displayed (quit / refresh) go back to the front of the bag.
 function releaseBag(bag){
  const back=bag.inflight;bag.inflight=[];
  back.slice().reverse().forEach(id=>{
   const si=bag.seen.indexOf(id);
   if(si>=0){bag.seen.splice(si,1);if(!bag.remaining.includes(id))bag.remaining.unshift(id);}
   const ri=bag.recent.lastIndexOf(id);if(ri>=0)bag.recent.splice(ri,1);
  });
 }
 function draw(key,ids,count,groupOf,avoidGroups){
  const bag=bagFor(key);
  releaseBag(bag);sync(bag,ids);
  const n=ids.length;count=Math.max(0,Math.min(count,n));
  if(groupOf){const g=new Set(ids.map(groupOf));if(g.size<count)groupOf=null;}
  const picked=[],pickedSet=new Set(),groups=new Set(groupOf&&avoidGroups?avoidGroups:[]),leftover=[];let deferred=[],rebuilds=0;
  while(picked.length<count&&rebuilds<=4){
   if(!bag.remaining.length){
    // Cycle exhausted: rebuild the COMPLETE pool and reshuffle (Fisher-Yates).
    rebuilds++;
    const owed=deferred.concat(leftover.splice(0));deferred=[];
    const owedSet=new Set(owed);
    const win=Math.min(count,Math.floor(n/2));
    const avoid=new Set(bag.recent.slice(-win));
    const rest=ids.filter(i=>!owedSet.has(i)&&!pickedSet.has(i));
    const fresh=shuffle(rest.filter(i=>!avoid.has(i)));
    const stale=shuffle(rest.filter(i=>avoid.has(i)));
    bag.remaining=owed.concat(fresh,stale,shuffle(picked));   // just-played questions go to the very end
    bag.seen=[];
    if(!bag.remaining.length)break;
   }
   const id=bag.remaining.shift();
   if(pickedSet.has(id)){leftover.push(id);continue;}
   if(groupOf&&rebuilds<2&&groups.has(groupOf(id))){deferred.push(id);continue;}
   picked.push(id);pickedSet.add(id);if(groupOf)groups.add(groupOf(id));bag.seen.push(id);
  }
  bag.remaining=deferred.concat(bag.remaining,leftover);
  bag.inflight=picked.slice();
  bag.recent=bag.recent.concat(picked).slice(-RECENT_MAX);
  save();
  return picked;
 }
 function markShown(key,id){const b=bagFor(key);const i=b.inflight.indexOf(id);if(i>=0){b.inflight.splice(i,1);save();}}
 function release(key){const b=bagFor(key);releaseBag(b);save();}
 function peek(key){return bagFor(key);}
 function reset(){state=null;}
 return{draw,markShown,release,peek,reset};
})();
// Pick n distractors with distinct answer values that never equal the correct answer.
function distractors(list,valFn,correctVal,n,exclude){
 const seen=new Set([correctVal]),out=[];
 for(const x of shuffle(list)){
  if(exclude&&exclude(x))continue;
  const v=valFn(x);if(seen.has(v))continue;
  seen.add(v);out.push(x);if(out.length>=n)break;
 }
 return out;
}
/* ===== END ROTATION ENGINE ===== */

function pool(){
 if(selectedMode==="ot") return DATA.filter(x=>x.t==="ot");
 if(selectedMode==="nt") return DATA.filter(x=>x.t==="nt");
 if(selectedMode==="hard") return DATA.filter(x=>hardNames.has(x.n));
 return DATA;
}
/* ===== KNOWLEDGE BANK (authored multi-step questions) ===== */
const GR={
P:["Samuel","Nathan","Elijah","Elisha","Isaiah","Jeremiah","Ezekiel","Daniel","Amos","Hosea","Jonah","Micah","Haggai","Zechariah"],
KJ:["Rehoboam","Asa","Jehoshaphat","Joash","Uzziah","Jotham","Ahaz","Hezekiah","Manasseh","Josiah","Jehoiakim","Zedekiah"],
KI:["Jeroboam","Omri","Ahab","Jehu","Menahem","Pekah","Hoshea","Baasha"],
J:["Othniel","Ehud","Shamgar","Gideon","Jephthah","Samson","Tola","Jair"],
HP:["Eli","Zadok","Abiathar","Hilkiah","Jehoiada","Caiaphas","Annas","Eleazar"],
AP:["Peter","Andrew","John","Philip","Bartholomew","Thomas","Matthew","James son of Alphaeus"],
PC:["Barnabas","Silas","Timothy","Titus","Tychicus","Epaphras","Mark","Aquila"],
HR:["Herod the Great","Herod Antipas","Herod Agrippa I","Herod Agrippa II"],
RM:["Pontius Pilate","Felix","Festus","Gallio","Sergius Paulus","Claudius Lysias"],
FK:["Nebuchadnezzar","Sennacherib","Cyrus","Darius","Belshazzar","Shalmaneser"],
W:["Deborah","Ruth","Naomi","Hannah","Abigail","Esther","Huldah","Rahab","Bathsheba","Jael"]};
// [question, answer, distractor group or explicit list, reference, depth level 1-5, testament o/n/b, knowledge-point id "character:fact"]
const FACT_ROWS=[
["Which prophet anointed both Saul and David as king?","Samuel","P","1 Sam 10:1; 16:13",3,"o","samuel:anoints-kings"],
["Which prophet confronted David with a parable about a poor man's only ewe lamb after the affair with Bathsheba?","Nathan","P","2 Sam 12:1–7",2,"o","nathan:ewe-lamb"],
["Which prophet healed the Syrian commander Naaman of leprosy?","Elisha","P","2 Kgs 5:1–14",2,"o","elisha:naaman"],
["Which king of Judah, son of Ahaz, received Isaiah's counsel during Sennacherib's invasion and was given fifteen added years of life?","Hezekiah","KJ","2 Kgs 19–20; Isa 37–38",4,"o","hezekiah:isaiah-sennacherib"],
["Which king of Judah began to reign at eight years old and heard the Book of the Law read after it was found during temple repairs?","Josiah","KJ","2 Kgs 22:1, 8–11",3,"o","josiah:book-of-law"],
["Isaiah saw the Lord high and lifted up in the year that which king died?","Uzziah","KJ","Isa 6:1",3,"o","isaiah:call-uzziah"],
["Which king of Judah cut Jeremiah's scroll with a penknife and burned it in the fire?","Jehoiakim","KJ","Jer 36:21–23",3,"o","jehoiakim:scroll"],
["As a consequence of entering the temple to burn incense, which king of Judah was struck with leprosy?","Uzziah","KJ","2 Chr 26:16–21",3,"o","uzziah:leprosy"],
["Which king of Israel was anointed by a young prophet sent by Elisha and then struck down the house of Ahab?","Jehu","KI","2 Kgs 9:1–10",3,"o","jehu:anointed"],
["Which woman judged Israel while sitting under a palm tree between Ramah and Bethel?","Deborah",["Jael","Huldah","Miriam"],"Judg 4:4–5",2,"o","deborah:palm-tree"],
["Which judge reduced his army from 32,000 to 300 men at God's direction?","Gideon","J","Judg 7:2–7",2,"o","gideon:three-hundred"],
["Which priest survived the massacre at Nob and fled to David?","Abiathar","HP","1 Sam 22:18–20",3,"o","abiathar:nob"],
["Which priest directed the coup that crowned the boy king Joash and ended Athaliah's rule?","Jehoiada","HP","2 Kgs 11:4–16",3,"o","jehoiada:joash"],
["Which high priest presided when the council condemned Jesus and tore his robes at the charge of blasphemy?","Caiaphas","HP","Matt 26:57–65",3,"n","caiaphas:trial"],
["Which prophetess was consulted by Josiah's officials about the newly found Book of the Law?","Huldah",["Deborah","Miriam","Anna"],"2 Kgs 22:14–20",3,"o","huldah:book-of-law"],
["Which Moabite woman married Boaz and became the great-grandmother of David?","Ruth","W","Ruth 4:13–22",3,"o","ruth:boaz-david"],
["Which woman of Jericho appears in Joshua 2, in Jesus' genealogy in Matthew 1, and among the examples of faith in Hebrews 11?","Rahab",["Ruth","Tamar","Bathsheba"],"Josh 2; Matt 1:5; Heb 11:31",5,"b","rahab:jericho-matthew-hebrews"],
["Which of the Twelve was absent when Jesus first appeared to the disciples, and later said, 'My Lord and my God'?","Thomas","AP","John 20:24–28",2,"n","thomas:absent"],
["Which man named James was executed by Herod Agrippa I?","James son of Zebedee",["James son of Alphaeus","James the Lord's brother","James the Less"],"Acts 12:1–2",4,"n","james:zebedee-executed"],
["Which Herod, tetrarch of Galilee, had John the Baptist imprisoned and beheaded?","Herod Antipas","HR","Mark 6:14–28",3,"n","antipas:john-baptist"],
["Which Herod, with Bernice, heard Paul's defense at Caesarea after Festus became governor?","Herod Agrippa II","HR","Acts 25:13–26:32",4,"n","agrippa2:paul"],
["Which governor left Paul imprisoned at Caesarea to please the Jews, when Festus succeeded him?","Felix","RM","Acts 24:27",3,"n","felix:paul-prison"],
["Which proconsul of Achaia refused to judge the charges brought against Paul at Corinth?","Gallio","RM","Acts 18:12–17",3,"n","gallio:corinth"],
["Which coworker of Paul was imprisoned with him at Philippi after Paul cast a spirit out of a slave girl?","Silas","PC","Acts 16:16–25",3,"n","silas:philippi"],
["Which coworker did Paul leave in Crete to appoint elders in every city?","Titus","PC","Titus 1:5",3,"n","titus:crete"],
["Which young disciple, son of a Jewish mother and a Greek father, did Paul circumcise before taking him on his journeys?","Timothy","PC","Acts 16:1–3",3,"n","timothy:circumcised"],
["Which man did Paul send back to Philemon, urging him to receive him as a beloved brother?","Onesimus",["Tychicus","Epaphras","Archippus"],"Philem 10–16",3,"n","onesimus:philemon"],
["Which Ananias was the Damascus disciple sent to restore Saul's sight?","Ananias of Damascus",["Ananias husband of Sapphira","Ananias the high priest","Annas the high priest"],"Acts 9:10–18",4,"n","ananias:damascus"],
["Which prophet's words about a voice crying in the wilderness are applied to John the Baptist in Matthew 3?","Isaiah","P","Isa 40:3; Matt 3:3",3,"b","isaiah:voice-john"],
["Which prophet named Bethlehem as the origin of a ruler, a passage cited to Herod by the chief priests and scribes?","Micah","P","Mic 5:2; Matt 2:4–6",3,"b","micah:bethlehem"],
["Which prophet's account of a great fish did Jesus cite as a sign of his own burial and resurrection?","Jonah","P","Jonah 1:17; Matt 12:39–40",3,"b","jonah:sign"],
["Gabriel told Mary her son would receive the throne of which ancestor, to whom an everlasting house was promised through Nathan?","David",["Solomon","Hezekiah","Josiah"],"2 Sam 7:12–16; Luke 1:32–33",4,"b","david:throne-promise"],
["Based on the biblical narrative, which pair could NOT have met during their lifetimes?","Samuel and Solomon",["Elijah and Ahab","Isaiah and Hezekiah","Jeremiah and Zedekiah"],"1 Sam 25:1; 2 Sam 12:24; 1 Kgs 17–21; Isa 37; Jer 37–38",5,"o","samuel-solomon:non-contemporaries"],
["Three of these reigned as kings of Judah. Which one did not?","Jehu son of Nimshi",["Jehoshaphat","Amaziah","Jotham"],"2 Kgs 9:1–3; 12:21; 14:1; 15:32",3,"o","jehu:not-judah"],
["Which sequence lists these kings of Judah in the correct order?","Solomon → Rehoboam → Abijah → Asa",["Solomon → Rehoboam → Asa → Abijah","Rehoboam → Solomon → Abijah → Asa","Solomon → Abijah → Rehoboam → Asa"],"1 Kgs 11:43; 14:31; 15:8, 24",4,"o","judah-early-kings:order"],
["Which sequence lists these kings of Judah in the correct order?","Hezekiah → Manasseh → Amon → Josiah",["Hezekiah → Amon → Manasseh → Josiah","Manasseh → Hezekiah → Amon → Josiah","Hezekiah → Manasseh → Josiah → Amon"],"2 Kgs 20:21; 21:18, 26; 22:1",4,"o","judah-middle-kings:order"],
["Ruth 4 records that Boaz fathered Obed, Obed fathered Jesse, and Jesse fathered David. What was Boaz to David?","Great-grandfather",["Grandfather","Father","Uncle"],"Ruth 4:17–22",4,"o","boaz:david-relation"],
["Who said to Saul that obedience is better than sacrifice, after Saul spared Agag and the best of the flock?","Samuel","P","1 Sam 15:20–23",3,"o","samuel:obey-sacrifice"],
["Who said to whom, 'Whither thou goest, I will go'?","Ruth to Naomi",["Naomi to Ruth","Orpah to Naomi","Ruth to Boaz"],"Ruth 1:16–17",3,"o","ruth:whither-thou-goest"],
["Which Persian king, through Esther and Mordecai, issued a decree permitting the Jews to defend themselves on the appointed day?","Ahasuerus",["Cyrus","Darius","Nebuchadnezzar"],"Esth 8:7–11",3,"o","ahasuerus:jewish-defense"],
["Which king of Babylon took Jehoiachin into exile and made Zedekiah king in Judah?","Nebuchadnezzar","FK","2 Kgs 24:10–17",3,"o","nebuchadnezzar:jehoiachin"],
["Which priest and scribe brought the Book of the Law before the assembly and read it aloud from morning until midday?","Ezra",["Nehemiah","Zerubbabel","Haggai"],"Neh 8:1–3",3,"o","ezra:reads-law"]
];
const FACTS=FACT_ROWS.map(r=>({id:"F|"+r[6],q:r[0],a:r[1],g:r[2],ref:r[3],lvl:r[4],t:r[5],kp:r[6],cg:r[6].split(":")[0]}));
const FB=new Map(FACTS.map(f=>[f.id,f]));
function factPool(){
 if(selectedMode==="ot")return FACTS.filter(f=>f.t!=="n");
 if(selectedMode==="nt")return FACTS.filter(f=>f.t!=="o");
 if(selectedMode==="hard")return FACTS.filter(f=>f.lvl>=4);
 return FACTS;
}
function factQuestion(f){
 const d=Array.isArray(f.g)?f.g:shuffle(GR[f.g].filter(x=>x!==f.a)).slice(0,3);
 return {id:f.id,key:factKey,lvl:f.lvl,q:f.q,correct:f.a,options:shuffle([f.a,...d]),
  exp:`<b>${f.a}</b> <span class="book">${f.ref}</span>`};
}
/* ===== END KNOWLEDGE BANK ===== */
const CHAR_TYPES=["story","kids","book"];
const PERSON_BY_KEY=new Map(DATA.map(x=>[x.t+"|"+x.n,x]));
let activeKey="";
function charUnits(people){const u=[];people.forEach(x=>CHAR_TYPES.forEach(t=>u.push(x.t+"|"+x.n+"|"+t)));return u;}
function unitGroup(id){return id.split("|")[1].toLowerCase();}
function near(person,rest){
 const tok=s=>s.split(/[ ;–]/)[0],t=tok(person.book);
 return shuffle(rest).sort((a,b)=>(tok(b.book)===t)-(tok(a.book)===t)).slice(0,14);
}
function makeQuestion(person,type,p){
 const rest=p.filter(x=>x.n!==person.n),nr=near(person,rest);
 const pick=(f,v)=>{let o=distractors(nr,f,v,3);
  if(o.length<3)o=o.concat(distractors(rest,f,v,3-o.length,x=>o.some(y=>f(y)===f(x))));return o;};
 if(type==="story"){
   const others=pick(x=>x.n,person.n);
   return {lvl:2,q:`Who is described by this story?\n“${person.story}”`, correct:person.n,
      options:shuffle([person.n,...others.map(x=>x.n)]),
      exp:`${person.n}: ${person.story} <span class="book">Found in ${person.book}.</span>`};
 }
 if(type==="kids"){
   const others=pick(x=>x.kids,person.kids);
   return {lvl:1,q:`Which children or descendants are specifically associated with ${person.n} in this quiz?`, correct:person.kids,
      options:shuffle([person.kids,...others.map(x=>x.kids)]),
      exp:`${person.n} — Children/descendants: ${person.kids}. <span class="book">${person.book}</span>`};
 }
 const others=pick(x=>x.book,person.book);
 return {lvl:1,q:`Where can the story of ${person.n} be found?`, correct:person.book,
    options:shuffle([person.book,...others.map(x=>x.book)]),
    exp:`${person.n}: ${person.story} <span class="book">${person.book}</span>`};
}
let factKey="";
function start(){
 const p=pool();
 activeKey="char:"+selectedMode;factKey="fact:"+selectedMode;
 // ~1/3 of each game comes from the authored multi-step bank; the rest from the character bank.
 const fp=factPool(),fpick=Rotation.draw(factKey,fp.map(f=>f.id),Math.min(7,Math.floor(fp.length/3)),id=>FB.get(id).cg);
 const cpick=Rotation.draw(activeKey,charUnits(p),20-fpick.length,unitGroup,fpick.map(id=>FB.get(id).cg));
 quiz=shuffle(fpick.map(id=>factQuestion(FB.get(id))).concat(cpick.map(id=>{
   const k=id.lastIndexOf("|");
   const q=makeQuestion(PERSON_BY_KEY.get(id.slice(0,k)),id.slice(k+1),p);
   q.id=id;q.key=activeKey;return q;
 })));
 idx=0;score=0;locked=false;startTime=Date.now();
 clearInterval(tick); tick=setInterval(updateTimer,1000); updateTimer();
 show("quiz"); document.getElementById("modePill").textContent=modeNames[selectedMode];
 document.getElementById("qtotal").textContent=quiz.length;
 document.getElementById("score").textContent=score;
 render();
}
function render(){
 locked=false;
 const q=quiz[idx];Rotation.markShown(q.key,q.id);document.getElementById("qlvl").textContent=q.lvl?"• Depth level "+q.lvl+"/5":"";
 document.getElementById("qnum").textContent=idx+1;
 document.getElementById("bar").style.width=((idx)/quiz.length*100)+"%";
 document.getElementById("question").textContent=q.q;
 const a=document.getElementById("answers"); a.innerHTML="";
 q.options.forEach(opt=>{
  const b=document.createElement("button"); b.className="answer"; b.textContent=opt;
  b.onclick=()=>answer(b,opt); a.appendChild(b);
 });
 document.getElementById("explanation").classList.remove("show");
 document.getElementById("explanation").innerHTML="";
 document.getElementById("nextBtn").classList.add("hidden");
}
function answer(btn,opt){
 if(locked)return; locked=true;
 const q=quiz[idx];
 document.querySelectorAll(".answer").forEach(b=>{
   b.disabled=true;
   if(b.textContent===q.correct)b.classList.add("correct");
 });
 if(opt===q.correct){score++;document.getElementById("score").textContent=score;burst(45);}
 else btn.classList.add("wrong");
 const e=document.getElementById("explanation");e.innerHTML=q.exp;e.classList.add("show");
 document.getElementById("nextBtn").classList.remove("hidden");
}
document.getElementById("nextBtn").onclick=()=>{
 idx++;
 if(idx>=quiz.length)finish();else render();
}
function finish(){
 clearInterval(tick);
 document.getElementById("bar").style.width="100%";
 show("result");
 document.getElementById("scoreBig").textContent=`${score}/${quiz.length}`;
 const pct=Math.round(score/quiz.length*100);
 document.getElementById("resultText").textContent=
   pct>=90?"Excellent — outstanding Bible character knowledge.":
   pct>=70?"Strong result — you know many of these characters well.":
   pct>=50?"Good start — review the explanations and try again.":
   "Keep studying — the obscure characters will become much easier with repetition.";
 document.getElementById("finalTime").textContent=formatTime(Math.floor((Date.now()-startTime)/1000));
 burst(180);
}
function updateTimer(){document.getElementById("timer").textContent=formatTime(Math.floor((Date.now()-startTime)/1000));}
function formatTime(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function show(id){["home","quiz","result","study"].forEach(x=>document.getElementById(x).classList.toggle("hidden",x!==id));}
document.getElementById("startBtn").onclick=start;
document.getElementById("againBtn").onclick=start;
document.getElementById("homeBtn").onclick=()=>{clearInterval(tick);Rotation.release(activeKey);Rotation.release(factKey);show("home")};
document.getElementById("backBtn").onclick=()=>show("home");
document.getElementById("studyBtn").onclick=()=>{
 const s=document.getElementById("studyList"); s.innerHTML="";
 ["ot","nt"].forEach(t=>{
   const h=document.createElement("h2");h.textContent=t==="ot"?"Old Testament":"New Testament";h.style.marginTop="24px";s.appendChild(h);
   DATA.filter(x=>x.t===t).forEach(x=>{
      const d=document.createElement("div");d.style.cssText="padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08)";
      d.innerHTML=`<b>${x.n}</b><div class="small"><span class="book">${x.book}</span> • Children: ${x.kids}</div><div class="small" style="margin-top:5px">${x.story}</div>`;
      s.appendChild(d);
   });
 }); show("study");
};

document.getElementById("dbCount").textContent = DATA.length+" characters • "+FACTS.length+" multi-step questions";

let sMode="all", sQuiz=[], sIdx=0, sScore=0, sLocked=false;
const NTBOOKS=new Set(["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]);
const allBooks=[...new Set(SCRIPTURES.map(x=>x.book))];
document.getElementById("bookSelect").innerHTML=allBooks.map(x=>`<option>${x}</option>`).join("");
function showAny(id){["home","quiz","result","study","scriptureHome","scriptureQuiz","scriptureResult","scriptureBrowse","memo"].forEach(x=>document.getElementById(x)?.classList.toggle("hidden",x!==id));}
document.getElementById("scriptureBtn").onclick=()=>showAny("scriptureHome");
document.getElementById("scriptureBack").onclick=()=>showAny("home");
document.getElementById("sHome").onclick=()=>showAny("scriptureHome");
document.getElementById("browseBack").onclick=()=>showAny("scriptureHome");
document.querySelectorAll(".scriptureMode").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".scriptureMode").forEach(x=>x.classList.remove("selected"));
 b.classList.add("selected");sMode=b.dataset.smode;
 document.getElementById("bookChooser").classList.toggle("hidden",sMode!=="book");
});
function scripturePool(){
 if(sMode==="parables")return PARABLES;
 if(sMode==="miracles")return MIRACLES;
 if(sMode==="book")return SCRIPTURES.filter(x=>x.book===document.getElementById("bookSelect").value);
 if(sMode==="ot")return SCRIPTURES.filter(x=>!NTBOOKS.has(x.book));
 if(sMode==="nt")return SCRIPTURES.filter(x=>NTBOOKS.has(x.book));
 if(sMode==="memo"){const m=MemoIds();return SCRIPTURES.filter(x=>m.has(x.book+"|"+x.ref));}
 return SCRIPTURES;
}
const PARABLE_BY=new Map(PARABLES.map(x=>[x.name,x])), MIRACLE_BY=new Map(MIRACLES.map(x=>[x.name,x])), SCR_BY=new Map(SCRIPTURES.map(x=>[x.book+"|"+x.ref,x]));
let sKey="";
function sGroup(id){return id.split("|").slice(0,3).join("|");}
function sPlan(){
 if(sMode==="parables")return {key:"scr:parables",ids:PARABLES.flatMap(p=>["name","ref"].map(k=>`P|${p.name}|${k}`)),count:20,group:x=>x.split("|").slice(0,2).join("|")};
 if(sMode==="miracles")return {key:"scr:miracles",ids:MIRACLES.flatMap(p=>["name","ref"].map(k=>`M|${p.name}|${k}`)),count:20,group:x=>x.split("|").slice(0,2).join("|")};
 const pl=scripturePool();
 const key="scr:"+sMode+(sMode==="book"?":"+document.getElementById("bookSelect").value:"");
 return {key,ids:pl.flatMap(x=>["book","ref","fill"].map(k=>`S|${x.book}|${x.ref}|${k}`)),count:sMode==="book"?Math.min(10,Math.max(5,pl.length*2)):20,group:sGroup};
}
function buildS(id){
 const parts=id.split("|"),tag=parts[0];
 if(tag==="P"){
  const p=PARABLE_BY.get(parts[1]),exp=`${p.name} — ${p.ref}. ${p.theme}`;
  if(parts[2]==="name"){const o=distractors(PARABLES,x=>x.name,p.name,3,x=>x.ref===p.ref);
   return {id,q:`Which parable is found at ${p.ref}?`,ans:p.name,opts:shuffle([p.name,...o.map(x=>x.name)]),exp};}
  const o=distractors(PARABLES,x=>x.ref,p.ref,3);
  return {id,q:`Which reference contains the parable “${p.name}”?`,ans:p.ref,opts:shuffle([p.ref,...o.map(x=>x.ref)]),exp};
 }
 if(tag==="M"){
  const p=MIRACLE_BY.get(parts[1]),exp=`${p.name} — ${p.ref}.`;
  if(parts[2]==="ref"){const o=distractors(MIRACLES,x=>x.ref,p.ref,3);
   return {id,q:`Where is this miracle recorded: ${p.name}?`,ans:p.ref,opts:shuffle([p.ref,...o.map(x=>x.ref)]),exp};}
  const o=distractors(MIRACLES,x=>x.name,p.name,3,x=>x.ref===p.ref);
  return {id,q:`Which miracle is recorded at ${p.ref}?`,ans:p.name,opts:shuffle([p.name,...o.map(x=>x.name)]),exp};
 }
 const p=SCR_BY.get(parts[1]+"|"+parts[2]),kind=parts[3],global=SCRIPTURES.filter(x=>x.book!==p.book);
 const exp=`${p.book} ${p.ref} (KJV): “${p.text}”`;
 if(kind==="book"){const o=distractors(global,x=>x.book,p.book,3);
  return {id,q:`“${p.text}”\n\nWhich book is this KJV passage from?`,ans:p.book,opts:shuffle([p.book,...o.map(x=>x.book)]),exp};}
 if(kind==="ref"){const v=x=>`${x.book} ${x.ref}`,o=distractors(global,v,v(p),3);
  return {id,q:`Which reference matches this KJV passage?\n\n“${p.text}”`,ans:v(p),opts:shuffle([v(p),...o.map(v)]),exp};}
 const words=p.text.split(" "),cut=Math.min(words.length-1,Math.max(2,Math.floor(words.length*.72))),
  lead=words.slice(0,cut).join(" "),tail=words.slice(cut).join(" "),tl=Math.max(2,words.length-cut),
  tv=x=>x.text.split(" ").slice(-tl).join(" "),o=distractors(global,tv,tail,3);
 return {id,q:`Complete the KJV wording:\n\n“${lead} …”`,ans:tail,opts:shuffle([tail,...o.map(tv)]),exp};
}
function startS(){
 const plan=sPlan();sKey=plan.key;if(!plan.ids.length){alert("Add verses in Scripture Memorisation first.");return;}
 sIdx=0;sScore=0;sLocked=false;
 sQuiz=Rotation.draw(plan.key,plan.ids,plan.count,plan.group).map(buildS);
 document.getElementById("sqtotal").textContent=sQuiz.length;document.getElementById("sScore").textContent=0;
 document.getElementById("sModePill").textContent=({all:"All Scripture",ot:"Old Testament",nt:"New Testament",book:"Book Practice",parables:"Parables of Christ",miracles:"Miracles of Christ",memo:"My Memorised Verses"})[sMode];
 showAny("scriptureQuiz");renderS();
}
function renderS(){
 sLocked=false;const q=sQuiz[sIdx];Rotation.markShown(sKey,q.id);document.getElementById("sqnum").textContent=sIdx+1;document.getElementById("sbar").style.width=(sIdx/sQuiz.length*100)+"%";
 document.getElementById("squestion").textContent=q.q;let a=document.getElementById("sanswers");a.innerHTML="";
 q.opts.forEach(o=>{let b=document.createElement("button");b.className="answer";b.textContent=o;b.onclick=()=>answerS(b,o);a.appendChild(b)});
 document.getElementById("sexplanation").classList.remove("show");document.getElementById("snext").classList.add("hidden");
}
function answerS(btn,o){
 if(sLocked)return;sLocked=true;const q=sQuiz[sIdx];
 document.querySelectorAll("#sanswers .answer").forEach(b=>{b.disabled=true;if(b.textContent===q.ans)b.classList.add("correct")});
 if(o===q.ans){sScore++;document.getElementById("sScore").textContent=sScore;burst(35)}else btn.classList.add("wrong");
 let e=document.getElementById("sexplanation");e.textContent=q.exp;e.classList.add("show");document.getElementById("snext").classList.remove("hidden");
}
document.getElementById("snext").onclick=()=>{sIdx++;if(sIdx>=sQuiz.length){document.getElementById("sbar").style.width="100%";showAny("scriptureResult");document.getElementById("sScoreBig").textContent=`${sScore}/${sQuiz.length}`;let p=Math.round(sScore/sQuiz.length*100);document.getElementById("sResultText").textContent=p>=90?"Excellent Scripture recognition.":p>=70?"Strong result. Keep repeating the passages until the references become automatic.":p>=50?"Good progress. Review the passages you missed and repeat the session.":"Use Browse Scripture Bank for a study round, then try again.";if(p>=80)burst(150)}else renderS()};
document.getElementById("startScripture").onclick=startS;document.getElementById("sAgain").onclick=startS;
function browse(){
 let q=document.getElementById("scriptureSearch").value.toLowerCase(), arr=SCRIPTURES.filter(x=>(x.book+" "+x.ref+" "+x.text).toLowerCase().includes(q));
 document.getElementById("scriptureList").innerHTML=arr.map(x=>`<div style="padding:15px 0;border-bottom:1px solid rgba(255,255,255,.08)"><b class="book">${x.book} ${x.ref}</b><div style="margin-top:6px;line-height:1.55">${x.text}</div></div>`).join("");
}
document.getElementById("browseScripture").onclick=()=>{showAny("scriptureBrowse");browse()};
document.getElementById("scriptureSearch").oninput=browse;

// Confetti
const c=document.getElementById("confetti"),ctx=c.getContext("2d");let pieces=[];
function resize(){c.width=innerWidth;c.height=innerHeight} addEventListener("resize",resize);resize();
function burst(n=80){
 for(let i=0;i<n;i++) pieces.push({x:innerWidth/2,y:innerHeight*.22,vx:(Math.random()-.5)*12,vy:(Math.random()-1)*10-3,g:.22,s:4+Math.random()*5,r:Math.random()*6.28,c:["#e6b85c","#f6dc98","#efe9da","#7f95ff","#27d17f"][i%5]});
 animate();
}
let animating=false;
function animate(){
 if(animating)return;animating=true;
 (function loop(){
  ctx.clearRect(0,0,c.width,c.height);
  pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=.1;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);ctx.restore()});
  pieces=pieces.filter(p=>p.y<c.height+30);
  if(pieces.length)requestAnimationFrame(loop);else{animating=false;ctx.clearRect(0,0,c.width,c.height)}
 })();
}
