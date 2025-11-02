import math
import random

NUM_DAYS_IN_NOVEMBER = 30
TARGET_NUM_WORDS = 20_000
RANGE_BOUND = 1000


def calculate_time_bias(day_num: int) -> float:
    """Calculate time-based bias for a given day.

    Returns positive bias early in the month, negative bias late in the month.
    Ranges from +RANGE_BOUND/3 on day 0 to -RANGE_BOUND/3 on day 29.
    """
    return (RANGE_BOUND / 3) * (1 - 2 * day_num / (NUM_DAYS_IN_NOVEMBER - 1))


def calculate_daily_word_count(base_daily_target: float, day_num: int) -> int:
    """Calculate word count for a given day with time bias and random variance."""
    time_bias = calculate_time_bias(day_num)
    random_variance = random.randrange(-RANGE_BOUND, RANGE_BOUND)
    daily_count = base_daily_target + time_bias + random_variance
    return max(0, math.ceil(daily_count))


def generate_number_of_words_per_day() -> list[int]:
    """Generate a list of daily word counts that hits TARGET_NUM_WORDS by month end.

    Word counts are front-loaded (higher early in month) with random variance.
    """
    result = []
    base_daily_target = TARGET_NUM_WORDS / NUM_DAYS_IN_NOVEMBER

    for day_num in range(NUM_DAYS_IN_NOVEMBER):
        if day_num == NUM_DAYS_IN_NOVEMBER - 1:
            # Last day: write whatever's needed to hit the target
            final_count = max(0, TARGET_NUM_WORDS - sum(result))
            result.append(final_count)
        else:
            daily_count = calculate_daily_word_count(base_daily_target, day_num)
            result.append(daily_count)

    return result


if __name__ == "__main__":
    print(generate_number_of_words_per_day())
