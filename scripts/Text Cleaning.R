# Prep ----
library(tidytext)
library(SnowballC)
librarian::shelf("scriptuRs")


source("scripts/01_process-data.R")
####| Data ####


matt_df <- newtest_df %>%
  filter(book_title == "Matthew")


# Text Cleaning ----
####| Tokenisation ####
# Splitting text into individual tokens (words, sentences etc)
matt_df %>%
  unnest_tokens(output = "word",
                input = text,
                token = "words") %>%
  count(word, sort = TRUE)

# Searhces for all verses that contain "Jesus" (regarless of case)
matt_df %>%
  filter(chapter_number == 1) %>%
  unnest_tokens(output = "Jesus",
                input = text,
                token = "regex",
                pattern = "(?i)jesus") %>%
  relocate(verse_title, Jesus)

####| Stemming ####|
# Transforming words to their root word
newtest_df %>%
  unnest_tokens(output = "word",
                input = text,
                token = "words") %>%
  mutate(word = wordStem(word)) %>% # The wordStem isn't quite accurate.
  count(word, sort = TRUE)

# This still contains a bunch of words that aren't that useful (like "and", "the" etc.)
## These are known as stop words and we will remove them as below


####| Remove Stop Words ####
newtest_df %>%
  unnest_tokens(output = "word",
                input = text,
                token = "words") %>%
  mutate(word = wordStem(word)) %>%
  anti_join(stop_words) %>%
  count(word, sort = TRUE)


####| Lemmatisation ####
# Similar to stemming, but it looks at words within a context (e.g., a sentence)
## So in both Stemming and Lemmatisation, "walking" becomes "walk",
## but the word "meeting" in the context; "there was a meeting" will stay as "meeting" in lemmatisation but become "meet" in stemming