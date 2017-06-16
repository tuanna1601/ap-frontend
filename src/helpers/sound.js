export function playAlert() {
  const snd = new Audio('data:audio/mp3;base64,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PiaDFmKMlFHTmKf2tiVByJEzSLwCBgLAjVKf////////WoxDrAY9mTS/eSqH////////60CIHwaf//Bf//OEZAUVPccoUXtUmAAAA0gAAAAA/+S0//URMAoACzqzAKTGP+o8RAQSV9mnBYANLoSAhAQORhSAynLih+ZMADZgygFmAOBOIQZDBFBsSphqwQmQqEjecmHERWM5nUFQTQKmqxfS1/x0AAM+VUlg5HPY7LB8o693cJB0u3i4JkkTzXq7RBAflFqqqQbcvZR4FUOTEDZIsAmgFKLVNX////6v//9ZwRUDIsiLoJvtG6Vf////////6isnFh//9LP///OEZAYViccoUXs0pwAAA0gAAAAA/EFJFhuDBGATNW7TwJw877CCIB2YmZCKgAoKGAiAKYGwExhPhbnIUzqZJYOJg2AXGBABgYDYMZgrgxoBH3oEGQgISQ3JQSAQFZX6xTTU9UuVUf5NrcGEBO7+C8xbaf5sqPk+nfwR6VZbmLQSG1G/hAZvpUcLZsSwGAbJKuiwORIFhZqHHBQQfaZf///+3//+gmH4AcI6Mgbod4/kj/////////ibTZWDJRao//N0ZAQSwcc1c2/TggAAA0gAAAAAAIR3/3qpa/Xo1Qjf0KJz92oGTeR/tY+2QoDJfRVW4LDoTACLmORhlKqnGE0CYYCIBoBABMAoAowSgBF/yynWQJAE0mFpF4TTWJWnx2vnQ1chUL0ZReF4hSmsT2SKlqBtqW2dAFGmqZeE3AXmVmcVkVSDGIZ2RFWv///6/f///sfCri231D+RT////////+iOh+kB//N0ZAESUccxAjfTZAAAA0gAAAAAIWEEecQ0gU0zzAAVROEzKDM/4MTYsy5wpQrMVAByQCoUDZMOd7swHgdxAAoHAADwGQKD6TxHonQtUAw82WbhCgLrUHIKN8zWgKSbQC0k3Zy6DkHnhE4VbrDHSJ0C6AvA0sXgGvlctEiDUICsifQiIh4Uawb1FTbQf/6//////6RDQPgiRf8smv////////9yLrV2//OEZAETfclNF20qtQAAA0gAAAAAxPAAo2T/zy1OvozhMRqTX2d27j9MoXYqRMd56zAJRGH4jE5qILCImFkETDesooai0BaMAgrGYMTkMGEisMMXIQcVoT17srTHZfD9x9HIZ21+H0agUBAACBvVAoGAwKGDokCgIBgUQtGKxYMMWRzRt8bMLtzXcYY5AN////5+vz3/0HhYfk/4wCWr/iSJn///4/f////8aF/DHyAaxPAYxe7/9uxa9dkNOU1q//N0ZBATSfFXF2zNtQAAA0gAAAAApKoapo1lLr8y6TXmHLuy7nVlMNPtD1NBaYqBAwcCT6pYKVMqYtsWmIEM7B2MZDCyJEIM1dpnS7l3M6jVyGnaCgEFJaEkgESJU5pFEKJbKiJFHDiJEiR7UdJHO2slpJP//rb76kh3pJJPqSS+pJJIHGUkkn6i8bf5ia9X//9av////6T/RjML3/qNqkLryABPUsRF//N0ZAgR3dk5EkvTkgAAA0gAAAAAMnEzgY+b2PgqxE2Is4xXygHaSc4GdE5UiACZLJniDgoAavAwABgOgOmEcLoaYQepg7AWGAsBQYFYDRgLgEsoidS7Ach1+g/RLSAtsuJLOE/wvAYuYAhEKI8ngQxRSsKIzpEcJ/fG6MTmbf///6iAf/+gXwEFBwzR///9X/////////7pGvxPDvn0ACif+ETka7q9//N0ZAwRSds7Ez+ylAAAA0gAAAAACeJfXghcOnBKnyaWs7ajGgaoriGalV4bqbbFM4kKGSWAEIA3MCZQNHWFFQkQgDCTEhuUQhVm03H8/qSOQZ9pAEAkX3UsRa8OEN9NzQWeIsbrKgCAKzSgT55ch4mT4/je5Zf////WS7f/9EyAhgc5H///2//////////Pm/1kVQp4BJ/7rDgADzWfy13/rLn1yzKU//N0ZBQTcdkwsns0pgAAA0gAAAAAYLPeNHhFjlkQgIqRrXZayaS0EPNRVcUAClAFYGCRMRkOo4wQgzDhAfMCMFEEgmmAeBkWxblAM1Oyfe8u8yoVHCDOnk96HiI+1/CqIUHd5shFeW1hGgid8u86228J1R1u2/2rOljyZLbf///1iyT//+ozGcAXgAWAF9BP//+v////////+3zp9SGjMF/zQMZGXpnP//N0ZAsScdkzAT/TeAAAA0gAAAAA/lHdGncj0JrT8bKVe1ujAB7b4f7WZ+zEW6JbhYAYAgPmA4DMYP525oGk6GDmDGYFoF5hDAHmDQAYl22kXljdrmG/3+6jczAjAefS9po6lyeEQBQ2ZhkEbaBmcACqPbPGI1EhoOIeeIqHAcjDb////UK9//2SLQDBweUts///9v/////////5ieUgowX/3it64O8///OEZAoUMdku8XtUpgAAA0gAAAAA+/9RK2ES+HniXvl/qOtrQ5UxeAoAKvdqLKlT+s5WGS9AIARgGALmBqDEYeR85v0FEGFkBaIgMDCCBIMHQA8tMpq70tdKQa/uHcKd2DsCV31azCRYRZy8qCCg3+8kqGPY1IZMGmimf6YPl2+xgSA4f6BZQF1DPGn9bf//WH5p//1LMhegRqhtpkdVt//6v////2/////KBUUBgTAv/VCSFzdJvX//9Vql9mki//N0ZBMUWdkvAWfUkgAAA0gAAAAAZEVf/0p2O27U0ORPtV1tQ+kuyxiaAAxwzAcAaME8FcxKDBjkQIFMPoHAwQAZjBzBMME0BMDAEMrhiVwHLe4endhzgOuHFAE8dGcBQyaPCIgGDazgQiCcWmOcBFeUUp0VxaZWD8gJAzZoa0GAuXyQ////3FAG3/+mgQMDDKwRNycN0Ff//pf///7f////9zJFITFw//OEZAMTXdsxAj/UggAAA0gAAAAAEv+tlxGu636b/yOh64HiVJ8V/DXKRuzQAmB4T62zjGHnCXym8SAFkIFAoD+YGaQhlGl8mAGDADgNDCjANMIcAoESERsO0rCuldPRrOCQgapIRMqpiKCE6sJhAoOawyQmDokRAxBYcSLoDKsyBAwWJH2h5QvLjXb////RGKe//opGJAgAFQIjxVS///0f//////03//+cHe4AdAf/docAGb7H///3cUrpuWaV//N0ZBMTfdsusXs0pgAAA0gAAAAALC930pWKTFLKQuAukza3tm0Mxp3mKpREwBhMB+EBQmKKG8dAIPJiCgTmBKDCFwXTANA+BALIoBlU7It9+m5qurIVPaGRWYeJn7/PLBRWXvVUhHeXtSXBG7m951k3bE6qi1TevTbKwuTJb////1iFX//1GYzgCaQWKF9BN/////////////8zIs8h0awAPDrYMJDQ//N0ZAoSmdkzE0OzeAAAA0gAAAAATQrrnRjiuVhpCmBvqGEcPqTJ6hGAPZvhvNyZ+diLPEtwsAxgCEJgoNBjz4J+7PRjeMphWF5kQBZjUBiXbeSOWPVUwz+7/ajMzCEHnYvaaOrpPCIAoLTDiRpoGZwDUMe2xiIUSGg5B54lYZR8jC9////qFqb//Zy0CxwqUts//9/////////9X/niQSCBIAFpMHJi//OEZAgUKdkvEUfUhAAAA0gAAAAAGv+oQBPFccQdYCTNsRUW0ppGwWiBVGroLKmn9Zyu5IUAgAGAcA2YG4MBh8HnnAgTwYXQFJUA0MH4EowcADy2ymrvQ60qQ655hQL4ygHWGigzpkJCBYYavCIoKE9INkEyRMCAgYFQRBeI/SPmwiAWOmlYcMKCHqF8af///6w/M9//UiZC9AfTCykvL////////7eg3/63/9IllQABAhJqJUIZJtD9MPE99nUr//OEZBEUwdku9kvUSgAAA0gAAAAATyv/6jrmZ2pogAkdrHXE95RdnGJl4DAFAFMBoBgwSwWzEkMiOPQhkw+AdDBCBmMHcEowUQEQBggrcgBNj7KroXZ2IMB2QInQvHRjAUKmjwmKBgus4EIgmFpjnALryZSnRSC3J4PyAkHSRWHDCgRVifJDq///9QoA///pmA5YGEZgWXk4boK///Q/////b0n//U//mB0BESH//rCq1yDPnM8/qpqTdI9rGWyY//N0ZBYUhdktAGPUlAAAA0gAAAAA/pNtoE1ukBKCJlvmSwlK/zAkyR0A5UZA6MAQK0wWV3DOvPdMBsIQIBgMNsB0wtwGhID1M5vYPWBi9fX4/usskwRANn7kOaBBTNLCJAKI7nhBIMofMRmQMskGki5wQlZkBXwUTFdlhrQoR1ist////oCjN//RSLo5QGKcAWhERNm///pN//////9b///SLaol5yIg//N0ZAQShS1JK2eNbQAAA0gAAAAAAGRQP/ecei6map1jnpUcyRmOOQ5D12XLa+1w0gDEIM5BQBXBeAu4XgUHL3rTSHRXQDrHWHWOoImIkIXcLqGCAYADMeLFQkA33RRU+1ty2tuW5bX2uOQ5DWHIchyGGNZh9/43G3XjcbjcuoKSksVbGFJgN5p0tAnnNZmWIpoEqkhQb///5df//4TJ3/+Sz38O1dce//NkZAIOZS9QuzMFhQAAA0gAAAAAAE0BsbEFbVlatWgkBIAJcuXGRkSjExMTExMTExMV31qyc0tLGYadpnSmSKwFYd4CEJsaXGfpgS6mvOU/z/Q1GZbSh0pWMHm5SlKUxhIPGMYWMIh0VKUpSlf8xv////oZ//zMUoCgoDCwd//////9VMmqCDVSAYkc0rWU//NkZAkOpecaGyDHfAAAA0gAAAAApVw1kiq3tZKhyAqIrWRI53BQmjSOUaAVUai3OXzkm1iSUzJEklTm5X/cjj4cSJY4BR7d2Nyv5ZRFc06YJRv999VMVU0WcqF2t4+A1ILivOU3///t6FuZPcFgCAuSGg6Sb+eLXnov////NO2JVUxBTUUzLjk5LjVVVVVV//MUZA4AAAEiAAACAAAAA0gAAAAAVVVV');
  snd.play();
}