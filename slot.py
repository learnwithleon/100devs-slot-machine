import random

symbols = [1, 2, 3]


while True:
    tokens = 100
    print("Welcome to the slots game.")
    while tokens > 0:
        print(f"You have {tokens} tokens.")
        try:
            bet = int(input("Bet amount:"))
        except:
            print("Please enter a whole number not decimals")
            continue
        if bet > tokens:
            print("Not enough tokens.")
        else:
            tokens -= bet
            slot_one = random.choice(symbols)
            slot_two = random.choice(symbols)
            slot_three = random.choice(symbols)
            slot_four = random.choice(symbols)
            slot_five = random.choice(symbols)

            print()  # blank line
            print(
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
            )
            print("--------------------")
            print(
                "|",
                slot_one,
                "|",
                slot_two,
                "|",
                slot_three,
                "|",
                slot_four,
                "|",
                slot_five,
            )
            print("---------------------")
            print(
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
                "|",
                random.choice(symbols),
            )
            print()

            if slot_one == slot_two == slot_three == slot_four == slot_five:
                amount_one = bet * 2
                print(f"You won {amount_one} tokens")
                tokens += amount_one
            else:
                print("you lost this time.")
    print("You are out of tokens.")
    print("Thanks for playing")
