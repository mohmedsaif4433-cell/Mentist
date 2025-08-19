document.addEventListener('DOMContentLoaded', function() {

    // --- Game 1: Cavity Combat ---
    const ccGameArea = document.getElementById('cavity-combat-game');
    if (ccGameArea) {
        const ccStartBtn = document.getElementById('cc-start-btn');
        const ccScoreEl = document.getElementById('cc-score');
        let ccScore = 0;
        let ccGameInterval;

        ccStartBtn.addEventListener('click', startCavityCombat);

        function startCavityCombat() {
            ccStartBtn.style.display = 'none';
            ccScore = 0;
            updateCCScore();
            ccGameInterval = setInterval(createBacteria, 1200);
            setTimeout(endCavityCombat, 20000); // End game after 20 seconds
        }

        function createBacteria() {
            const bacteria = document.createElement('div');
            bacteria.classList.add('cc-bacteria');
            bacteria.style.top = Math.random() * (ccGameArea.offsetHeight - 40) + 'px';
            bacteria.style.left = Math.random() * (ccGameArea.offsetWidth - 40) + 'px';
            
            bacteria.addEventListener('click', function() {
                ccScore++;
                updateCCScore();
                bacteria.remove();
            });

            ccGameArea.appendChild(bacteria);
            setTimeout(() => { bacteria.remove(); }, 2000);
        }

        function updateCCScore() {
            ccScoreEl.textContent = `النقاط: ${ccScore}`;
        }

        function endCavityCombat() {
            clearInterval(ccGameInterval);
            alert(`انتهت اللعبة! نتيجتك النهائية هي: ${ccScore}`);
            ccStartBtn.style.display = 'block';
            document.querySelectorAll('.cc-bacteria').forEach(b => b.remove());
        }
    }

    // --- Game 2: Clinic Simulator ---
    const csGameArea = document.getElementById('clinic-simulator-game');
    if (csGameArea) {
        const csToothCase = document.getElementById('cs-tooth-case');
        const csCaseDesc = document.getElementById('cs-case-description');
        const csTools = document.querySelectorAll('.cs-tool');
        const csFeedback = document.getElementById('cs-feedback');
        const csNewCaseBtn = document.getElementById('cs-new-case-btn');

        const cases = [
            { id: 'calculus', name: 'تراكم الجير', correctTool: 'scaler', cssClass: 'cs-tooth-calculus' },
            { id: 'yellow', name: 'اصفرار الأسنان', correctTool: 'bleaching', cssClass: 'cs-tooth-yellow' },
            { id: 'caries', name: 'تسوس بسيط', correctTool: 'drill', cssClass: 'cs-tooth-caries' },
            { id: 'broken', name: 'سن مكسور (للخلع)', correctTool: 'forceps', cssClass: 'cs-tooth-broken' }
        ];
        let currentCase = {};

        function generateNewCase() {
            currentCase = cases[Math.floor(Math.random() * cases.length)];
            csToothCase.className = 'cs-tooth-case';
            csToothCase.classList.add(currentCase.cssClass);
            csCaseDesc.textContent = `الحالة: ${currentCase.name}`;
            csFeedback.textContent = 'اختر الأداة المناسبة';
            csFeedback.style.color = '#0A2540';
        }

        csTools.forEach(tool => {
            tool.addEventListener('click', () => {
                if (!currentCase.id) return;
                const selectedTool = tool.dataset.tool;
                if (selectedTool === currentCase.correctTool) {
                    csFeedback.textContent = 'أحسنت! أداة صحيحة.';
                    csFeedback.style.color = 'green';
                    csToothCase.classList.add('cs-tooth-clean');
                    currentCase = {}; // Lock game until new case
                } else {
                    csFeedback.textContent = 'خطأ! حاول مرة أخرى.';
                    csFeedback.style.color = 'red';
                }
            });
        });

        csNewCaseBtn.addEventListener('click', generateNewCase);
        generateNewCase();
    }

    // --- Game 3: Quick Diagnosis ---
    const qdGameArea = document.getElementById('quick-diagnosis-game');
    if (qdGameArea) {
        const questionTextEl = document.getElementById('qd-question-text');
        const optionsAreaEl = document.getElementById('qd-options-area');
        const feedbackEl = document.getElementById('qd-feedback');

        const questions = [
            { question: "مريض يعاني من نزيف اللثة عند التفريش ولثة حمراء متورمة. ما هو التشخيص الأولي؟", options: ["تسوس عميق", "التهاب اللثة", "تآكل المينا", "قرحة فموية"], answer: "التهاب اللثة" },
            { question: "بقعة بيضاء على السن لا تزول بالكشط وحساسية للحلويات. ما هو التشخيص المحتمل؟", options: ["تصبغات خارجية", "نقص كالسيوم", "تسوس أولي (بقعة بيضاء)", "فلورة"], answer: "تسوس أولي (بقعة بيضاء)" },
            { question: "ألم حاد ومستمر في السن يزداد ليلًا. ما هو التشخيص الأقرب؟", options: ["التهاب لب السن غير الردود", "حساسية عنق السن", "جيوب لثوية", "كسر في السن"], answer: "التهاب لب السن غير الردود" }
        ];
        let currentQuestionIndex = 0;

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionTextEl.textContent = currentQuestion.question;
            optionsAreaEl.innerHTML = '';
            feedbackEl.textContent = '';

            currentQuestion.options.forEach(optionText => {
                const button = document.createElement('button');
                button.textContent = optionText;
                button.classList.add('qd-option');
                button.addEventListener('click', () => checkAnswer(optionText, currentQuestion.answer, button));
                optionsAreaEl.appendChild(button);
            });
        }

        function checkAnswer(selectedOption, correctAnswer, button) {
            document.querySelectorAll('.qd-option').forEach(btn => btn.disabled = true); // Disable all buttons
            if (selectedOption === correctAnswer) {
                button.classList.add('correct');
                feedbackEl.textContent = 'إجابة صحيحة!';
                feedbackEl.style.color = 'green';
            } else {
                button.classList.add('incorrect');
                feedbackEl.textContent = `إجابة خاطئة. الصحيحة هي: ${correctAnswer}`;
                feedbackEl.style.color = 'red';
            }
            setTimeout(() => {
                currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
                loadQuestion();
            }, 2500);
        }
        loadQuestion();
    }
});
