import math
import random

NUM_DAYS_IN_NOVEMBER = 30
TARGET_NUM_WORDS = 50_000


# requirements:
# must hit 50k by end of month
# should be unpredictable, vary by ~500 words either direction each day
def generate_number_of_words_per_day() -> list[int]:
    result = []
    for i in range(NUM_DAYS_IN_NOVEMBER):
        if i == NUM_DAYS_IN_NOVEMBER - 1:
            result.append(TARGET_NUM_WORDS - sum(result))
            break

        on_track_number = (TARGET_NUM_WORDS - sum(result)) / (NUM_DAYS_IN_NOVEMBER - i)
        daily_number = math.ceil(on_track_number + random.randrange(-500, 500))
        result.append(daily_number)

    return result


if __name__ == "__main__":
    print(generate_number_of_words_per_day())
