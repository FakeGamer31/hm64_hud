from python_server.ReadWriteClass import ReadWriteMemory

name_address_array = [
    ('hour', 0xE003B5C9,),
    ('minutes', 0xDFFB027C),
    ('stamina', 0xDFFC9063),
    ('fatigue', 0xDFFC90D2),
    ('alcohol', 0xDFFC9E51),
    ('money', 0xDFFC9AC4),
    ('horse', 0xDFFAFDD3),
    ('dog', 0xDFFC86B3),
    ('maria', 0x0E0003F93),
    ('popuri', 0x0E0003F92),
    ('elli', 0x0E0003F91),
    ('ann', 0x0E0003F90),
    ('karen', 0x0E0003F97),
    ('harris', 0x0E0003F95),
    ('grey', 0x0E0003F94),
    ('jeff', 0x0E0003F9B),
    ('cliff', 0x0E0003F9A),
    ('kai', 0x0E0003F99),
    ('mayor', 0x0E0003F98),
    ('mayor_Wife', 0x0E0003F9F),
    ('lillia', 0x0E0003F9E),
    ('basil', 0x0E0003F9D),
    ('ellen', 0x0E0003F9C),
    ('doug', 0x0E0003FA3),
    ('gotz', 0x0E0003FA2),
    ('gotz_Wife', 0x0E0003FA1),
    ('potion_man', 0x0E0003FA0),
    ('kent', 0x0E0003FA7),
    ('stu', 0x0E0003FA6),
    ('midwife', 0x0E0003FA5),
    ('may', 0x0E0003FA4),
    ('rick', 0x0E0003FAB),
    ('pastor', 0x0E0003FAA),
    ('shipper', 0x0E0003FA9),
    ('saibara', 0x0E0003FA8),
    ('barmann', 0x0E0003FAF),
    ('fischer', 0x0E0003FAE),
    ('zimmermann1', 0x0E0003FAD),
    ('zimmermann2', 0x0E0003FAC),
    ('meister', 0x0E0003FB3),
    ('waldvieh', 0x0E0003FB2),
    ('oldman', 0x0E0003FB7),
    ('oldwoman', 0x0E0003FB6),
    ('First', 0x0DFFAF8B0),
    ('Second', 0x0DFFAF8CF),
    ('Third', 0x0DFFAF8CE),
    ('Fourth', 0x0DFFAF8CD),
    ('Fifth', 0x0DFFAF8CC),
    ('Sixth', 0x0DFFAF8D3),
    ('Seventh', 0x0DFFAF8D2),
    ('Eighth', 0x0DFFAF8D1),
    ('Nineth', 0x0DFFAF8D0),
    ('Tenth', 0x0DFFAF8D5),
    ('Eleventh', 0x0DFFAF8D4)]

pointer_array = []

json_Object = {
    "time": {"hour": 0, "minutes": 0},
    "stats": {"stamina": 0, "fatigue": 0, "alcohol": 0, "money": 0},
    "animals": {"horse": 0, "dog": 0},
    "people": {"maria": 0, "popuri": 0, "elli": 0, "ann": 0, "karen": 0, "harris": 0, "grey": 0, "jeff": 0, "cliff": 0, "kai": 0, "mayor": 0, "mayor_Wife": 0, "lillia": 0, "basil": 0, 
               "ellen": 0, "doug": 0, "gotz": 0, "gotz_Wife": 0, "potion_man": 0, "kent": 0, "stu": 0, "midwife": 0, "may": 0, "rick": 0, "pastor": 0, "shipper": 0, "saibara": 0, 
               "barmann": 0, "fischer": 0, "zimmermann1": 0, "zimmermann2": 0, "meister": 0, "waldvieh": 0, "oldman": 0, "oldwoman": 0},
    "giftConvo": {"First": 0, "Second": 0, "Third": 0, "Fourth": 0, "Fifth": 0, "Sixth": 0, "Seventh": 0, "Eighth": 0, "Nineth": 0, "Tenth": 0, "Eleventh": 0}}

class HM64Mem:
    def __init__(self):
        rmw = ReadWriteMemory()
        self.process = rmw.get_process_by_name("Project64.exe")
        self.process.open()
        
        for name, address in name_address_array:
            pointer_array.append((name, self.process.get_pointer(address, offsets=[])))
        self.pointer_array = pointer_array

    def get_data(self):
        for idx, (name, pointer) in enumerate(self.pointer_array):
            if idx < 2:     
                json_Object["time"][name] = self.process.read(pointer) & 0xFF
            elif 2 <= idx < 6:
                if name == 'money':
                    json_Object["stats"][name] = self.process.read(pointer)
                else:
                    json_Object["stats"][name] = self.process.read(pointer) & 0xFF
            elif 6 <= idx < 8:
                json_Object["animals"][name] = self.process.read(pointer) & 0xFF
            elif 7 <= idx < 43:
                json_Object["people"][name] = self.process.read(pointer) & 0xFF
            else:
                json_Object["giftConvo"][name] = self.process.read(pointer) & 0xFF
        return json_Object
